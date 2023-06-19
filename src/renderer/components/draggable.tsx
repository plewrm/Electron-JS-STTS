import React, { useState, useEffect } from 'react';

const DraggableWidget: React.FC = () => {
  const [screenTime, setScreenTime] = useState(0);
  const [isIdle, setIsIdle] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      const isUserIdle = false;

      if (isUserIdle) {
        setIsIdle(true);
        return;
      }

      setIsIdle(false);

      setScreenTime((prevTime) => prevTime + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    const { clientX, clientY } = event;
    const rect = event.currentTarget.getBoundingClientRect();
    setOffset({ x: clientX - rect.left, y: clientY - rect.top });
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;

    const { clientX, clientY } = event;
    const { x, y } = offset;
    const left = clientX - x;
    const top = clientY - y;

    const widget = document.getElementById('widget');
    if (widget) {
      widget.style.left = `${left}px`;
      widget.style.top = `${top}px`;
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const formatTime = (time: number) => {
    const hours = Math.floor(time / 3600)
      .toString()
      .padStart(2, '0');
    const minutes = Math.floor((time % 3600) / 60)
      .toString()
      .padStart(2, '0');
    const seconds = (time % 60).toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };

  return (
    <div
      id="widget"
      style={{
        position: 'fixed',
        top: 20,
        left: 20,
        padding: 10,
        borderRadius: 8,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        color: 'white',
        zIndex: 9999,
        userSelect: 'none',
        cursor: 'move',
        fontFamily: 'Arial, sans-serif',
        fontSize: 16,
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <div style={{ opacity: isIdle ? 0.5 : 1 }}>
        {isIdle ? 'Idle' : formatTime(screenTime)}
      </div>
    </div>
  );
};

export default DraggableWidget;
