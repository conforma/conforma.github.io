document.addEventListener('DOMContentLoaded', function() {
  // Load Mermaid from CDN
  const script = document.createElement('script');
  script.src = 'https://cdn.jsdelivr.net/npm/mermaid@11.10.1/dist/mermaid.min.js';
  script.onload = function() {
    // Initialize Mermaid when the script loads
    mermaid.initialize({ 
      startOnLoad: true,
      theme: 'default',
      securityLevel: 'loose',
      flowchart: {
        useMaxWidth: false,
        htmlLabels: true
      },
      sequence: {
        useMaxWidth: false
      },
      gantt: {
        useMaxWidth: false
      }
    });

    // Add zoom functionality to Mermaid diagrams
    mermaid.init().then(() => {
      document.querySelectorAll('.mermaid').forEach(function(diagram) {
        // Make diagrams clickable for zoom
        diagram.style.cursor = 'zoom-in';
        diagram.style.maxWidth = '100%';
        diagram.style.height = 'auto';
        
        // Add click handler for zoom
        diagram.addEventListener('click', function() {
          // Create zoom overlay
          const overlay = document.createElement('div');
          overlay.className = 'mermaid-zoom-overlay';
          overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
            cursor: grab;
            overflow: hidden;
          `;
          
          // Create container for panning
          const container = document.createElement('div');
          container.style.cssText = `
            position: relative;
            cursor: grab;
            user-select: none;
            transform-origin: center center;
          `;
          
          // Clone the diagram for the overlay
          const clonedDiagram = diagram.cloneNode(true);
          clonedDiagram.style.cssText = `
            max-width: none;
            max-height: none;
            background: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
            cursor: grab;
            user-select: none;
            transform-origin: center center;
          `;
          
          container.appendChild(clonedDiagram);
          overlay.appendChild(container);
          document.body.appendChild(overlay);
          
          // Zoom and pan functionality
          let scale = 1;
          let translateX = 0;
          let translateY = 0;
          let isDragging = false;
          let lastX = 0;
          let lastY = 0;
          
          function updateTransform() {
            container.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
          }
          
          // Wheel zoom
          overlay.addEventListener('wheel', function(e) {
            e.preventDefault();
            const delta = e.deltaY > 0 ? 0.9 : 1.1;
            const newScale = Math.max(0.5, Math.min(5, scale * delta));
            
            if (newScale !== scale) {
              const rect = overlay.getBoundingClientRect();
              const centerX = rect.width / 2;
              const centerY = rect.height / 2;
              const mouseX = e.clientX - rect.left;
              const mouseY = e.clientY - rect.top;
              
              const offsetX = mouseX - centerX;
              const offsetY = mouseY - centerY;
              
              translateX = translateX - offsetX * (newScale / scale - 1);
              translateY = translateY - offsetY * (newScale / scale - 1);
              scale = newScale;
              
              updateTransform();
            }
          });
          
          // Mouse drag
          container.addEventListener('mousedown', function(e) {
            if (e.button === 0) { // Left mouse button
              isDragging = true;
              lastX = e.clientX;
              lastY = e.clientY;
              container.style.cursor = 'grabbing';
              overlay.style.cursor = 'grabbing';
              e.preventDefault();
            }
          });
          
          overlay.addEventListener('mousemove', function(e) {
            if (isDragging) {
              const deltaX = e.clientX - lastX;
              const deltaY = e.clientY - lastY;
              translateX += deltaX;
              translateY += deltaY;
              lastX = e.clientX;
              lastY = e.clientY;
              updateTransform();
            }
          });
          
          overlay.addEventListener('mouseup', function() {
            isDragging = false;
            container.style.cursor = 'grab';
            overlay.style.cursor = 'grab';
          });
          
          // Double-click to reset zoom
          container.addEventListener('dblclick', function(e) {
            e.stopPropagation();
            scale = 1;
            translateX = 0;
            translateY = 0;
            updateTransform();
          });
          
          // Close on background click (but not on diagram)
          overlay.addEventListener('click', function(e) {
            if (e.target === overlay) {
              document.body.removeChild(overlay);
            }
          });
          
          // Close on escape key
          const escapeHandler = function(e) {
            if (e.key === 'Escape') {
              document.body.removeChild(overlay);
              document.removeEventListener('keydown', escapeHandler);
            }
          };
          document.addEventListener('keydown', escapeHandler);
          
          // Add instructions
          const instructions = document.createElement('div');
          instructions.style.cssText = `
            position: absolute;
            top: 20px;
            left: 20px;
            background: rgba(0, 0, 0, 0.7);
            color: white;
            padding: 10px 15px;
            border-radius: 5px;
            font-size: 14px;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            z-index: 10000;
            pointer-events: none;
          `;
          instructions.innerHTML = `
            <div>🔍 Scroll to zoom</div>
            <div>🖱️ Drag to pan</div>
            <div>📱 Double-click to reset</div>
            <div>⌨️ ESC to close</div>
          `;
          overlay.appendChild(instructions);
        });
      });
    });
  };
  document.head.appendChild(script);
});