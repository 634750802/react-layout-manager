import clsx from 'clsx';
import { forwardRef, ReactElement, useEffect, useState } from 'react';
import { DraggableItemContextProvider } from '../../context/draggable-item.js';
import { Rect, toShapeStyle } from '../../core/types.js';
import { DraggableState, useDraggable } from '../../hooks/draggable.js';
import mergeRefs from '../../utils/merge-refs.js';
import { Resizer } from './resizer.js';

interface ComponentWrapperProps {
  className?: string;
  draggable: boolean;
  children: (dragging: boolean, draggableProps?: DraggableState<HTMLDivElement>['domProps']) => ReactElement;
  rect: Rect;
  onRectChange: (rect: Rect) => void;
  onReady: (id: string) => void;
}

const DRAGGING_STYLE = 'translate3d(0,0,0) translateY(-2px) scale(1.02)';

const ComponentWrapper = forwardRef<HTMLDivElement, ComponentWrapperProps>(({ className, draggable, rect, onReady, onRectChange, children }, forwardedRef) => {
  const [, setVersion] = useState(0);

  const {
    id,
    ref,
    shape,
    domProps,
    dragging,
    layout,
  } = useDraggable<HTMLDivElement>({
    shape: rect,
    onShapeChange: onRectChange,
    notify: (rect) => {
      if (rect) {
        setVersion(v => v + 1);
        onRectChange(rect)
      } else {
        setVersion(v => v + 1);
      }
    },
  });

  useEffect(() => {
    onReady(id);
  }, [id]);

  const properShape = id === layout.dragging?.id ? layout.currentShape : shape;
  const shapeStyle = toShapeStyle(layout.toDomShape(properShape));

  return (
    <div
      ref={mergeRefs(ref, forwardedRef)}
      className={clsx({
        'draggable-target': true,
        draggable,
        dragging,
      }, className)}
      style={{
        ...shapeStyle,
        transform: `${shapeStyle.transform}${dragging ? ' ' + DRAGGING_STYLE : ''}`,
        position: draggable ? undefined : 'absolute',
      }}
    >
      <DraggableItemContextProvider shape={shape} layout={layout}>
        {children(dragging, draggable ? domProps : undefined)}
        {draggable && (
          <div className="resize-handles">
            <Resizer id={id} shape={shape} position="end" type="vertical" />
            <Resizer id={id} shape={shape} position="end" type="horizontal" />
            <Resizer id={id} shape={shape} position="start" type="vertical" />
            <Resizer id={id} shape={shape} position="start" type="horizontal" />
          </div>
        )}
      </DraggableItemContextProvider>
    </div>
  );
});

export { ComponentWrapper };
export type { ComponentWrapperProps };