"use client";

import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { HierarchyPointNode, HierarchyPointLink } from 'd3-hierarchy';

interface FamilyTreeProps {
  data: FamilyNode;
}

interface FamilyNode {
  name: string;
  children?: FamilyNode[];
}

const FamilyTree: React.FC<FamilyTreeProps> = ({ data }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current)
      .attr('width', window.innerWidth)
      .attr('height', window.innerHeight)
      .call(d3.zoom<SVGSVGElement, unknown>().on('zoom', (event: d3.D3ZoomEvent<SVGSVGElement, unknown>) => {
        svg.select('g').attr('transform', event.transform.toString());
      }))
      .append('g');

    const root = d3.hierarchy<FamilyNode>(data);
    const treeLayout = d3.tree<FamilyNode>().size([window.innerWidth, window.innerHeight]);
    treeLayout(root);

    svg.selectAll('.link')
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

    const node = svg.selectAll('.node')
      .data(root.descendants() as Array<HierarchyPointNode<FamilyNode>>)
      .enter()
      .append('g')
      .attr('class', 'node')
      .attr('transform', (d: HierarchyPointNode<FamilyNode>) => `translate(${d.x || 0},${d.y || 0})`);

    node.append('circle')
      .attr('r', 20)
      .attr('fill', '#fff')
      .attr('stroke', '#000')
      .attr('stroke-width', 3);

    node.append('text')
      .attr('dy', -25)
      .attr('text-anchor', 'middle')
      .text(d => d.data.name)
      .attr('font-size', 12)
      .attr('fill', '#333');

    const handleResize = () => {
      svg.attr('width', window.innerWidth)
         .attr('height', window.innerHeight);
      treeLayout.size([window.innerWidth, window.innerHeight])(root);
      svg.selectAll('.link')
         .attr('x1', (d: any) => (d.source as HierarchyPointNode<FamilyNode>).x || 0)
         .attr('y1', (d: any) => (d.source as HierarchyPointNode<FamilyNode>).y || 0)
         .attr('x2', (d: any) => (d.target as HierarchyPointNode<FamilyNode>).x || 0)
         .attr('y2', (d: any) => (d.target as HierarchyPointNode<FamilyNode>).y || 0);
      svg.selectAll('.node')
         .attr('transform', (d: any) => `translate(${(d as HierarchyPointNode<FamilyNode>).x || 0},${(d as HierarchyPointNode<FamilyNode>).y || 0})`);
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [data]);

  return (
    <svg ref={svgRef} className="w-full h-full"></svg>
  );
};

export default FamilyTree;
