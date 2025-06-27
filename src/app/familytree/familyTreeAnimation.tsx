import * as d3 from 'd3';
import { HierarchyPointNode } from 'd3-hierarchy';
import { FamilyNode } from '@/app/types/interfaces';
import { atom } from 'jotai';

export function makeId(...parts: string[]) {
  return parts.join("-").replace(/[^\w\-]/g, "_");
}

interface AnimatorConfig {
  g: d3.Selection<SVGGElement, unknown, null, undefined>;
  nodeR: number;
  nodeColor: string;
  nodeHColor: string;
  lineDelay: number;
  lineDrawDur: number;
  lineHOpacity: number;
  lineOpacity: number;
  popInDur: number;
  popOutDur: number;
}

export function createAnimator(cfg: AnimatorConfig) {
  const {
    g,
    nodeR, nodeColor, nodeHColor,
    lineDelay, lineDrawDur, lineHOpacity, lineOpacity,
    popInDur, popOutDur
  } = cfg;

  function animateNode(
    datum: HierarchyPointNode<FamilyNode>,
    delay = 0
  ) {
    // 1) fade in this node group
    const group = g.select<SVGGElement>(`#${makeId('node', datum.data.id)}`);
    group.transition().delay(delay).attr('opacity', 1);

    // 2) pop its circle stroke
    const circ = group.select<SVGCircleElement>('circle');
    circ
      .attr('stroke', nodeHColor)
      .attr('stroke-width', 4)
      .transition().delay(delay).duration(popInDur)
        .attr('r', nodeR * 2)
      .transition().duration(popOutDur)
        .attr('r', nodeR)
        .attr('stroke', nodeColor)
        .attr('stroke-width', 3);

    // 3) spouse (if any)
    if (datum.data.spouse) {
      const spLinkSel = g.select<SVGLineElement>(
        `#${makeId('spouselink', datum.data.id)}`
      );
      const spEl = spLinkSel.node();
      if (spEl) {
        const L = spEl.getTotalLength();
        spLinkSel
          .attr('stroke-dasharray', `${L} ${L}`)
          .attr('stroke-dashoffset', L)
          .attr('stroke-opacity', lineHOpacity)
        .transition().delay(delay).duration(lineDrawDur)
          .attrTween('stroke-dashoffset', function(this: SVGLineElement) {
            const len = this.getTotalLength();
            return t => String((1 - t) * len);
          })
          .on('end', () => {
            const sgrp = g.select<SVGGElement>(
              `#${makeId('spouse-node', datum.data.id)}`
            );
            sgrp.attr('opacity', 1);
            const sc = sgrp.select<SVGCircleElement>('circle');
            sc
              .attr('stroke', nodeHColor)
              .attr('stroke-width', 4)
            .transition().duration(popInDur)
              .attr('r', nodeR * 2)
            .transition().duration(popOutDur)
              .attr('r', nodeR)
              .attr('stroke', nodeColor)
              .attr('stroke-width', 3);
          })
        .transition().duration(popOutDur)
          .attr('stroke-opacity', lineOpacity);
      }
    }

    // 4) child links + recurse
    const kids = datum.children || [];
    kids.forEach((child, i) => {
      const linkSel = g.select<SVGLineElement>(
        `#${makeId('link', datum.data.id, child.data.id)}`
      );
      const linkEl = linkSel.node();
      if (!linkEl) return;
      const len = linkEl.getTotalLength();
      linkSel
        .attr('stroke-dasharray',  `${len} ${len}`)
        .attr('stroke-dashoffset', len)
        .attr('stroke-opacity',    lineHOpacity)
      .transition().delay(delay + i * lineDelay).duration(lineDrawDur)
        .attrTween('stroke-dashoffset', function(this: SVGLineElement) {
          const L2 = this.getTotalLength();
          return t => String((1 - t) * L2);
        })
        .on('end', () => animateNode(child, 0))
      .transition().duration(popOutDur)
        .attr('stroke-opacity', lineOpacity);
    });
  }

  return animateNode;
}