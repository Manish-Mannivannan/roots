"use client";

import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { HierarchyPointNode, HierarchyPointLink } from 'd3-hierarchy';
import { FamilyTreeModal, SearchModal } from '../familytree/familyTreeExports';
import { FamilyNode } from '@/app/types/interfaces';

interface FamilyTreeProps {
  data: FamilyNode;
}

const FamilyTree: React.FC<FamilyTreeProps> = ({ data }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const gRef = useRef<SVGGElement | null>(null);
  const [selectedNode, setSelectedNode] = useState<FamilyNode | null>(data); // Initialize with the first node
  const [isSpouse, setIsSpouse] = useState<boolean>(false);
  const nodeR = 30; // Radius of each node
  const sOffset = 100; // Spouse node offset from main node

  const handleSelectFromSearch = (member: FamilyNode) => {
    // 1) Close the search modal
    const searchDialog = document.getElementById(
      "my_modal_2"
    ) as HTMLDialogElement;
    if (searchDialog) searchDialog.close();

    // 2) Open the family‐tree modal for that member
    setSelectedNode(member);
    setIsSpouse(false);
    const treeDialog = document.getElementById(
      "my_modal"
    ) as HTMLDialogElement;
    if (treeDialog) treeDialog.showModal();
  };

  const handleClick = (d: HierarchyPointNode<FamilyNode>, isSpouse: boolean) => {
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

    const svg = d3.select(svgRef.current)
      .attr('width', svgWidth)
      .attr('height', svgHeight);

    const g = d3.select(gRef.current);

    const root = d3.hierarchy<FamilyNode>(data);
    const treeLayout = d3.tree<FamilyNode>()
    .nodeSize([100, 200]); //Tree size [x,y]
    treeLayout(root);

    // Calculate the center offset based on the parent element's width
    const xOffset = svgWidth / 2 - (root.x || 0);
    const yOffset = svgHeight / 6 - (root.y || 0); // Adjust the yOffset as needed

    // Apply the initial transform to center the tree
    const initialTransform = d3.zoomIdentity.translate(xOffset, yOffset);
    svg.call(d3.zoom<SVGSVGElement, unknown>().transform, initialTransform);

    // Add zoom behavior with initial transform
    svg.call(d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.5, 2])  //scale from 50% to 200%
      .on('zoom', (event: d3.D3ZoomEvent<SVGSVGElement, unknown>) => {
        g.attr('transform', event.transform.toString());
      }));

    g.attr('transform', initialTransform.toString());

    // Define clipPath for circles
    svg.append('defs')
      .append('clipPath')
      .attr('id', 'circle-clip')
      .append('circle')
      .attr('r', nodeR)
      .attr('cx', 0)
      .attr('cy', 0);

    // Add links
    g.selectAll('.link')
      .data(root.links() as Array<HierarchyPointLink<FamilyNode>>)
      .enter()
      .append('line')
      .attr('class', 'link')
      .attr('x1', (d: HierarchyPointLink<FamilyNode>) => (d.source as HierarchyPointNode<FamilyNode>).x || 0)
      .attr('y1', (d: HierarchyPointLink<FamilyNode>) => (d.source as HierarchyPointNode<FamilyNode>).y || 0)
      .attr('x2', (d: HierarchyPointLink<FamilyNode>) => (d.target as HierarchyPointNode<FamilyNode>).x || 0)
      .attr('y2', (d: HierarchyPointLink<FamilyNode>) => (d.target as HierarchyPointNode<FamilyNode>).y || 0)
      .attr('stroke', '#ccc')
      .attr('stroke-width', 2);

    // Add nodes
    const node = g.selectAll('.node')
      .data(root.descendants() as Array<HierarchyPointNode<FamilyNode>>)
      .enter()
      .append('g')
      .attr('class', 'node')
      .style('cursor', 'pointer')
      .attr('transform', (d: HierarchyPointNode<FamilyNode>) => `translate(${d.x || 0},${d.y || 0})`)
      .on('click', function (event, d) {
        handleClick(d, false);
      });

    // Append images
    node.append('image')
      .attr('xlink:href', d => 'people/' + d.data.image || 'people/placeholderPerson.svg')
      .attr('width', 2 * nodeR)
      .attr('height', 2 * nodeR)
      .attr('x', -nodeR)
      .attr('y', -nodeR)
      .attr('clip-path', 'url(#circle-clip)');

    node.append('circle')
      .attr('r', nodeR)
      .attr('fill', 'none')
      .attr('stroke', '#000')
      .attr('stroke-width', 3);

    node.append('text')
      .attr('text-anchor', 'middle')
      .attr('dominant-baseline', 'hanging')
      .attr('font-size', 12)
      .attr('fill', '#333')
      .selectAll('tspan')
      .data(d => d.data.name.split(' ').reverse())
      .enter()
      .append('tspan')
      .attr('x', 0)
      .attr('dy', (d, i) => i === 0 ? -1.6 * nodeR + 'px' : -0.7 * nodeR + 'px') // Adjust vertical spacing
      .text(d => d);

    // Add spouse nodes
    const spouseNode = g.selectAll('.spouse-node')
      .data(root.descendants().filter(d => d.data.spouse !== undefined) as Array<HierarchyPointNode<FamilyNode>>)
      .enter()
      .append('g')
      .attr('class', 'spouse-node')
      .style('cursor', 'pointer')
      .attr('transform', (d: HierarchyPointNode<FamilyNode>) => `translate(${(d.x || 0) + sOffset},${d.y || 0})`)
      .on('click', function (event, d) {
        handleClick(d, true);
      });

    // Append images for spouse nodes
    spouseNode.append('image')
      .attr('xlink:href', d => 'people/' + d.data.spouseImage || 'person/placeholderPerson.svg')
      .attr('width', 2 * nodeR)
      .attr('height', 2 * nodeR)
      .attr('x', -nodeR)
      .attr('y', -nodeR)
      .attr('clip-path', 'url(#circle-clip)');

    spouseNode.append('circle')
      .attr('r', nodeR)
      .attr('fill', 'none')
      .attr('stroke', '#000')
      .attr('stroke-width', 3);

    spouseNode.append('text')
      .attr('text-anchor', 'middle')
      .attr('dominant-baseline', 'hanging')
      .attr('font-size', 12)
      .attr('fill', '#333')
      .selectAll('tspan')
      .data(d => (d.data.spouse || "").split(' ').reverse())
      .enter()
      .append('tspan')
      .attr('x', 0)
      .attr('dy', (d, i) => i === 0 ? -1.6 * nodeR + 'px' : -0.7 * nodeR + 'px') // Adjust vertical spacing
      .text(d => d);

    // Add spouse links
    g.selectAll('.spouse-link')
      .data(root.descendants().filter(d => d.data.spouse !== undefined) as Array<HierarchyPointNode<FamilyNode>>)
      .enter()
      .append('line')
      .attr('class', 'spouse-link')
      .attr('x1', (d: HierarchyPointNode<FamilyNode>) => (d.x || 0) + nodeR) // Adjust for circle radius
      .attr('y1', (d: HierarchyPointNode<FamilyNode>) => d.y || 0)
      .attr('x2', (d: HierarchyPointNode<FamilyNode>) => (d.x || 0) + sOffset - nodeR) // Adjust for circle radius
      .attr('y2', (d: HierarchyPointNode<FamilyNode>) => d.y || 0)
      .attr('stroke', '#000')
      .attr('stroke-width', 2);

    const handleResize = () => {
      const svgWidth = parentElement.clientWidth;
      const svgHeight = parentElement.clientHeight;

      svg.attr('width', svgWidth)
         .attr('height', svgHeight);

      treeLayout.size([svgWidth, svgHeight])(root);

      g.selectAll('.link')
         .attr('x1', (d: any) => (d.source as HierarchyPointNode<FamilyNode>).x || 0)
         .attr('y1', (d: any) => (d.source as HierarchyPointNode<FamilyNode>).y || 0)
         .attr('x2', (d: any) => (d.target as HierarchyPointNode<FamilyNode>).x || 0)
         .attr('y2', (d: any) => (d.target as HierarchyPointNode<FamilyNode>).y || 0);
      g.selectAll('.node')
         .attr('transform', (d: any) => `translate(${(d as HierarchyPointNode<FamilyNode>).x || 0},${(d as HierarchyPointNode<FamilyNode>).y || 0})`);
      g.selectAll('.spouse-node')
         .attr('transform', (d: any) => `translate(${(d as HierarchyPointNode<FamilyNode>).x + sOffset || 0},${(d as HierarchyPointNode<FamilyNode>).y || 0})`);
      g.selectAll('.spouse-link')
         .attr('x1', (d: any) => (d.x || 0) + nodeR)
         .attr('y1', (d: any) => d.y || 0)
         .attr('x2', (d: any) => (d.x || 0) + sOffset - nodeR)
         .attr('y2', (d: any) => d.y || 0);
    };
    
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [data]);

  return (
    <>
      <svg ref={svgRef} className="w-full h-full">
        <g ref={gRef}></g>
      </svg>
      {selectedNode && <FamilyTreeModal familyNode={selectedNode} isSpouse={isSpouse} />} {/* Render the modal with the selected node */}
      <SearchModal onSelect={handleSelectFromSearch}/>
    </>
  );
  
  
};

export default FamilyTree;
