"use client";

import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { HierarchyPointNode, HierarchyPointLink } from 'd3-hierarchy';

interface FamilyTreeProps {
  data: FamilyNode;
}

interface FamilyNode {
  name: string;
  spouse?: string;
  children?: FamilyNode[];
  image?: string; // Add an image property
}

// Helper function to randomly assign images
const getRandomImage = () => (Math.random() > 0.5 ? 'img1.png' : 'img2.png');

// Assign images to the family tree nodes
const assignImages = (node: FamilyNode) => {
  node.image = getRandomImage();
  if (node.children) {
    node.children.forEach(assignImages);
  }
};

const FamilyTree: React.FC<FamilyTreeProps> = ({ data }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const gRef = useRef<SVGGElement | null>(null);
  const nodeR = 30; // Radius of each node
  const sOffset = 100; // Spouse node offset from 

  // Assign images before rendering
  useEffect(() => {
    assignImages(data);
  }, [data]);

  useEffect(() => {
    if (!svgRef.current || !gRef.current) return;

    const svg = d3.select(svgRef.current)
      .attr('width', window.innerWidth)
      .attr('height', window.innerHeight)
      .call(d3.zoom<SVGSVGElement, unknown>().on('zoom', (event: d3.D3ZoomEvent<SVGSVGElement, unknown>) => {
        d3.select(gRef.current).attr('transform', event.transform.toString());
      }));

    const g = d3.select(gRef.current);

    const root = d3.hierarchy<FamilyNode>(data);
    const treeLayout = d3.tree<FamilyNode>()
      .nodeSize([100, 200]); // Increase node size for better spacing
    treeLayout(root);

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
      .attr('transform', (d: HierarchyPointNode<FamilyNode>) => `translate(${d.x || 0},${d.y || 0})`);

    // Append images
    node.append('image')
      .attr('xlink:href', d => d.data.image || '')
      .attr('width', 2*nodeR)
      .attr('height', 2*nodeR)
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
      .data(d => d.data.name.split(' '))
      .enter()
      .append('tspan')
      .attr('x', 0)
      // .attr('dy', (d, i) => i === 0 ? '-3em' : '-1.5em') // Adjust vertical spacing
      .attr('dy', (d, i) => i === 0 ? -1.6*nodeR+'px' : -.7*nodeR+'px') // Adjust vertical spacing
      .text(d => d);

    // Add spouse nodes
    const spouseNode = g.selectAll('.spouse-node')
      .data(root.descendants().filter(d => d.data.spouse !== undefined) as Array<HierarchyPointNode<FamilyNode>>)
      .enter()
      .append('g')
      .attr('class', 'spouse-node')
      .attr('transform', (d: HierarchyPointNode<FamilyNode>) => `translate(${(d.x || 0) + sOffset},${d.y || 0})`);

    // Append images for spouse nodes
    spouseNode.append('image')
      .attr('xlink:href', d => d.data.image || '')
      .attr('width', 2*nodeR)
      .attr('height', 2*nodeR)
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
      .data(d => (d.data.spouse || "").split(' '))
      .enter()
      .append('tspan')
      .attr('x', 0)
      .attr('dy', (d, i) => i === 0 ? -1.6*nodeR+'px' : -.7*nodeR+'px') // Adjust vertical spacing
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
      svg.attr('width', window.innerWidth)
         .attr('height', window.innerHeight);
      treeLayout.size([window.innerWidth, window.innerHeight])(root);
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
         .attr('x2', (d: any) => (d.x || 0) + sOffset)
         .attr('y2', (d: any) => d.y || 0);
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [data]);

  return (
    <svg ref={svgRef} className="w-full h-full">
      <g ref={gRef}></g>
    </svg>
  );
};

export default FamilyTree;
