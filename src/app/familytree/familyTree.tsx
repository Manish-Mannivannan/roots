"use client";

import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { HierarchyPointNode, HierarchyPointLink } from "d3-hierarchy";
import {
  FamilyTreeModal,
  SearchModal,
  makeId,
  createAnimator,
} from "../familytree/familyTreeExports";
import { FamilyNode } from "@/app/types/interfaces";

interface FamilyTreeProps {
  data: FamilyNode;
}

const FamilyTree: React.FC<FamilyTreeProps> = ({ data }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const gRef = useRef<SVGGElement | null>(null);
  const [selectedNode, setSelectedNode] = useState<FamilyNode | null>(data); // Initialize with the first node
  const [isSpouse, setIsSpouse] = useState<boolean>(false);
  const treeWidth = 100,
    treeHeight = 200, // Height and width og svg
    initialScale = 1.5; // pick your desired starting zoom

  const nodeR = 30, // Radius of each node
    nodeColor = "rgba(246, 156, 146, 1)", // Node normal color
    nodeHColor = "rgba(246, 186, 146, 1)", // Node highlight color
    sOffset = 100; // Spouse node offset from main node

  const lineOpacity = 0.5, // Regular line opacity
    lineHOpacity = 1, // Highlighted line opacity
    lineLOpacity = 0.2; // De-emphesized line opacity

  const textFontSize = 14, // Font size of text above node
    textMargin = 1.8, // Space from top of node to text
    textSpacing = 0.9; // Space between text lines

  const linkColor = "rgba(246, 146, 146, 1)", // Color of links
    linkWidth = 2; // Width of links

  const labelPadding = 4, // Padding for text lable
    labelBlur = 0.1; // Lable blur

  // Animation parameters
  const lineDelay = 400, // ms between each sibling-link
    popInDur = 300, // circle “pop” up
    popOutDur = 200, // circle “shrink” back
    lineDrawDur = 400; // link draw time

  const [isAnimating, setIsAnimating] = useState(true);
  const animRef = useRef(isAnimating);
  useEffect(() => {
    animRef.current = isAnimating;
  }, [isAnimating]);

  function treeDepth(node: d3.HierarchyPointNode<any>): number {
    if (!node.children || node.children.length === 0) return 1;
    return 1 + Math.max(...node.children.map(treeDepth));
  }

  const handleSelectFromSearch = (member: FamilyNode) => {
    // 1) Close the search modal
    const searchDialog = document.getElementById(
      "my_modal_2"
    ) as HTMLDialogElement;
    if (searchDialog) searchDialog.close();

    // 2) Open the family‐tree modal for that member
    setSelectedNode(member);
    setIsSpouse(false);
    const treeDialog = document.getElementById("my_modal") as HTMLDialogElement;
    if (treeDialog) treeDialog.showModal();
  };

  const handleClick = (
    d: HierarchyPointNode<FamilyNode>,
    isSpouse: boolean
  ) => {
    if (animRef.current) return;
    setSelectedNode(d.data); // Set the selected node
    setIsSpouse(isSpouse); //Set spouse boolean
    (document.getElementById("my_modal") as HTMLDialogElement).showModal(); // Show the modal
  };

  useEffect(() => {
    if (!svgRef.current || !gRef.current) return;

    const parentElement = svgRef.current.parentElement;
    if (!parentElement) return;

    const svgWidth = parentElement.clientWidth;
    const svgHeight = parentElement.clientHeight;

    const svg = d3
      .select(svgRef.current)
      // 1) establish a fixed “design size” coordinate system…
      .attr("viewBox", `0 0 ${svgWidth} ${svgHeight}`)
      // 2) tell the browser to scale it uniformly and center it
      .attr("preserveAspectRatio", "xMidYMid meet")
      // 3) let CSS control the actual on‐screen size
      .style("width", "100%")
      .style("height", "100%");
    const g = d3.select(gRef.current);

    const treeLayout = d3.tree<FamilyNode>().nodeSize([treeWidth, treeHeight]);
    const root = treeLayout(d3.hierarchy<FamilyNode>(data));

    // Calculate the center offset based on the parent element's width
    const xOffset = svgWidth / 2 - (root.x || 0);
    const yOffset = svgHeight / 6 - (root.y || 0); // Adjust the yOffset as needed

    // Apply the initial transform to center the tree
    const initialTransform = d3.zoomIdentity
      .translate(xOffset, yOffset)
      .scale(initialScale);
    svg.call(d3.zoom<SVGSVGElement, unknown>().transform, initialTransform);

    // Add zoom behavior with initial transform
    svg.call(
      d3
        .zoom<SVGSVGElement, unknown>()
        .scaleExtent([0.5, 2]) //scale from 50% to 200%
        .on("zoom", (event: d3.D3ZoomEvent<SVGSVGElement, unknown>) => {
          g.attr("transform", event.transform.toString());
        })
    );

    g.attr("transform", initialTransform.toString());

    // Define clipPath for circles
    svg
      .append("defs")
      .append("clipPath")
      .attr("id", "circle-clip")
      .append("circle")
      .attr("r", nodeR)
      .attr("cx", 0)
      .attr("cy", 0);

    // Define text blur
    svg
      .append("defs")
      .append("filter")
      .attr("id", "text-backdrop-blur")
      // expand the filter region so blur doesn’t get clipped
      .attr("x", "-20%")
      .attr("y", "-20%")
      .attr("width", "140%")
      .attr("height", "140%")
      .append("feGaussianBlur")
      .attr("in", "SourceGraphic")
      .attr("stdDeviation", 10); // tweak blur radius, “blur(10px)”

    // Add links
    g.selectAll(".link")
      .data(root.links() as Array<HierarchyPointLink<FamilyNode>>)
      .enter()
      .append("line")
      .attr("class", "link")
      .attr("id", (d) => makeId("link", d.source.data.id, d.target.data.id))
      .attr(
        "x1",
        (d: HierarchyPointLink<FamilyNode>) =>
          (d.source as HierarchyPointNode<FamilyNode>).x || 0
      )
      .attr(
        "y1",
        (d: HierarchyPointLink<FamilyNode>) =>
          (d.source as HierarchyPointNode<FamilyNode>).y || 0
      )
      .attr(
        "x2",
        (d: HierarchyPointLink<FamilyNode>) =>
          (d.target as HierarchyPointNode<FamilyNode>).x || 0
      )
      .attr(
        "y2",
        (d: HierarchyPointLink<FamilyNode>) =>
          (d.target as HierarchyPointNode<FamilyNode>).y || 0
      )
      .attr("stroke", linkColor)
      .attr("stroke-width", linkWidth)
      .attr("stroke-opacity", 0);

    // Add nodes
    const node = g
      .selectAll(".node")
      .data(root.descendants() as Array<HierarchyPointNode<FamilyNode>>)
      .enter()
      .append("g")
      .attr("class", "node")
      .attr("id", (d) => makeId("node", d.data.id))
      .attr("opacity", 0)
      .style("cursor", "pointer")
      .attr(
        "transform",
        (d: HierarchyPointNode<FamilyNode>) =>
          `translate(${d.x || 0},${d.y || 0})`
      )
      .on("click", function (event, d) {
        handleClick(d, false);
      });

    // Append images
    node
      .append("image")
      .attr(
        "xlink:href",
        (d) => "people/" + d.data.image || "people/placeholderPerson.svg"
      )
      .attr("width", 2 * nodeR)
      .attr("height", 2 * nodeR)
      .attr("x", -nodeR)
      .attr("y", -nodeR)
      .attr("clip-path", "url(#circle-clip)");

    node
      .append("circle")
      .attr("r", nodeR)
      .attr("fill", "transparent")
      .attr("stroke", `${nodeColor}`)
      .attr("stroke-width", 3);

    node
      .append("text")
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "hanging")
      .attr("font-size", textFontSize)
      .attr("fill", "var(--mutedBlack)")
      .selectAll("tspan")
      .data((d) => d.data.name.split(" ").reverse())
      .enter()
      .append("tspan")
      .attr("x", 0)
      .attr("dy", (d, i) =>
        i === 0 ? -textMargin * nodeR + "px" : -textSpacing * nodeR + "px"
      ) // Adjust vertical spacing
      .text((d) => d);

    // Add spouse nodes
    const spouseNode = g
      .selectAll(".spouse-node")
      .data(
        root.descendants().filter((d) => d.data.spouse !== undefined) as Array<
          HierarchyPointNode<FamilyNode>
        >
      )
      .enter()
      .append("g")
      .attr("class", "spouse-node")
      .attr("id", (d) => makeId("spouse-node", d.data.id))
      .attr("opacity", 0)
      .style("cursor", "pointer")
      .attr(
        "transform",
        (d: HierarchyPointNode<FamilyNode>) =>
          `translate(${(d.x || 0) + sOffset},${d.y || 0})`
      )
      .on("click", function (event, d) {
        handleClick(d, true);
      });

    // Append images for spouse nodes
    spouseNode
      .append("image")
      .attr(
        "xlink:href",
        (d) => "people/" + d.data.spouseImage || "person/placeholderPerson.svg"
      )
      .attr("width", 2 * nodeR)
      .attr("height", 2 * nodeR)
      .attr("x", -nodeR)
      .attr("y", -nodeR)
      .attr("clip-path", "url(#circle-clip)");

    spouseNode
      .append("circle")
      .attr("r", nodeR)
      .attr("fill", "transparent")
      .attr("stroke", `${nodeColor}`)
      .attr("stroke-width", 3);

    spouseNode
      .append("text")
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "hanging")
      .attr("font-size", textFontSize)
      .attr("fill", "var(--mutedBlack)")
      .selectAll("tspan")
      .data((d) => (d.data.spouse || "").split(" ").reverse())
      .enter()
      .append("tspan")
      .attr("x", 0)
      .attr("dy", (d, i) =>
        i === 0 ? -textMargin * nodeR + "px" : -textSpacing * nodeR + "px"
      ) // Adjust vertical spacing
      .text((d) => d);

    // Add spouse links
    g.selectAll(".spouse-link")
      .data(
        root.descendants().filter((d) => d.data.spouse !== undefined) as Array<
          HierarchyPointNode<FamilyNode>
        >
      )
      .enter()
      .append("line")
      .attr("class", "spouse-link")
      .attr("id", (d) => makeId("spouselink", d.data.id))
      .attr("x1", (d: HierarchyPointNode<FamilyNode>) => (d.x || 0) + nodeR) // Adjust for circle radius
      .attr("y1", (d: HierarchyPointNode<FamilyNode>) => d.y || 0)
      .attr(
        "x2",
        (d: HierarchyPointNode<FamilyNode>) => (d.x || 0) + sOffset - nodeR
      ) // Adjust for circle radius
      .attr("y2", (d: HierarchyPointNode<FamilyNode>) => d.y || 0)
      .attr("stroke", linkColor)
      .attr("stroke-width", linkWidth)
      .attr("stroke-opacity", 0);

    // Add blur rect to text
    g.selectAll<SVGGElement, any>(".node, .spouse-node").each(function () {
      const g = d3.select(this);
      const textEl = g.select<SVGTextElement>("text").node();
      if (!textEl) return;
      const { x, y, width, height } = textEl.getBBox();

      g.insert("rect", "text")
        .attr("x", x - labelPadding)
        .attr("y", y - labelPadding)
        .attr("width", width + 2 * labelPadding)
        .attr("height", height + 2 * labelPadding)
        .attr("rx", 4)
        .attr("ry", 4)
        .attr("fill", `rgba(255,255,255,${labelBlur})`)
        .attr("filter", "url(#text-backdrop-blur)")
        .attr("pointer-events", "none");
    });

    // Mouse events animation
    g.selectAll<SVGCircleElement, HierarchyPointNode<FamilyNode>>(
      ".node circle, .spouse-node circle"
    )
      .style("cursor", "pointer") // still show pointer
      .on("pointerover pointerdown", function (event, d) {
        if (animRef.current) return;
        const group = d3.select(this.parentNode as SVGGElement);
        // 1) scale & highlight
        group
          .select<SVGCircleElement>("circle")
          .transition()
          .duration(200)
          .attr("r", nodeR * 1.1)
          .attr("stroke", `${nodeHColor}`)
          .attr("stroke-width", 4);

        // 2) path highlight
        const ancestors = d.ancestors();
        g.selectAll<SVGLineElement, HierarchyPointLink<FamilyNode>>(".link")
          .transition()
          .duration(200)
          .attr("stroke-opacity", (link) =>
            ancestors.includes(link.target) ? lineHOpacity : lineLOpacity
          );

        // 2b) highlight the spouse-link if this is a spouse-group
        if ((this.parentNode as Element).classList.contains("spouse-node")) {
          const spId = makeId("spouselink", d.data.id);

          // fade out all the other spouse-links, if you want
          g.selectAll<SVGLineElement, unknown>(".spouse-link")
            .filter(function () {
              return this.id !== spId;
            })
            .transition()
            .duration(200)
            .attr("stroke-opacity", lineLOpacity);

          // highlight just this one
          g.select<SVGLineElement>(`#${spId}`)
            .transition()
            .duration(200)
            .attr("stroke-opacity", lineHOpacity);
        }
      })
      .on("pointerout pointerup", function (event, d) {
        if (animRef.current) return;
        const group = d3.select(this.parentNode as SVGGElement);
        // reset circle
        group
          .select<SVGCircleElement>("circle")
          .transition()
          .duration(200)
          .attr("r", nodeR)
          .attr("stroke", `${nodeColor}`)
          .attr("stroke-width", 3);
        // reset links
        g.selectAll<SVGLineElement, unknown>(".link, .spouse-link")
          .transition()
          .duration(200)
          .attr("stroke-opacity", lineOpacity);
      });

    const animateNode = createAnimator({
      g,
      nodeR,
      nodeColor,
      nodeHColor,
      lineDelay,
      lineDrawDur,
      lineHOpacity,
      lineOpacity,
      popInDur,
      popOutDur,
    });

    setIsAnimating(true);
    animateNode(root, 0);
    const D = treeDepth(root);
    const totalTime =
      popInDur +
      popOutDur +
      D * (lineDelay + lineDrawDur) +
      popInDur +
      popOutDur +
      50;

    const tid = window.setTimeout(() => setIsAnimating(false), totalTime);
    return () => window.clearTimeout(tid);
  }, [data]);

  useEffect(() => {
    console.log("isAnimating is now:", isAnimating);
  }, [isAnimating]);
  return (
    <>
      <svg ref={svgRef} className="w-full h-full">
        <g ref={gRef}></g>
      </svg>
      {selectedNode && (
        <FamilyTreeModal familyNode={selectedNode} isSpouse={isSpouse} />
      )}{" "}
      {/* Render the modal with the selected node */}
      <SearchModal onSelect={handleSelectFromSearch} />
    </>
  );
};

export default FamilyTree;
