document.addEventListener('DOMContentLoaded', () => {
    
    // === ЗАДАНИЕ 1: Геометрические фигуры ===
    const canvas1 = document.getElementById('task1');
    if (canvas1) {
        const ctx1 = canvas1.getContext('2d');
        
        ctx1.fillStyle = '#bae6fd';
        ctx1.strokeStyle = '#1d4ed8';
        ctx1.lineWidth = 5;
        ctx1.fillRect(25, 25, 120, 80);
        ctx1.strokeRect(25, 25, 120, 80);

        ctx1.beginPath();
        ctx1.arc(220, 65, 45, 0, Math.PI * 2);
        ctx1.fillStyle = '#bbf7d0';
        ctx1.strokeStyle = '#15803d';
        ctx1.lineWidth = 9;
        ctx1.fill();
        ctx1.stroke();

        ctx1.beginPath();
        ctx1.moveTo(150, 140);
        ctx1.lineTo(260, 270);
        ctx1.lineTo(40, 270);
        ctx1.closePath();
        ctx1.fillStyle = '#fecaca';
        ctx1.strokeStyle = '#b91c1c';
        ctx1.lineWidth = 3;
        ctx1.fill();
        ctx1.stroke();
    }

    // === ЗАДАНИЕ 2: Управление свойствами линий ===
    const canvas2 = document.getElementById('task2');
    if (canvas2) {
        const ctx2 = canvas2.getContext('2d');
        
        ctx2.lineWidth = 14;
        ctx2.strokeStyle = '#334155';
        
        ctx2.lineCap = 'butt';
        ctx2.beginPath(); ctx2.moveTo(40, 30); ctx2.lineTo(260, 30); ctx2.stroke();
        
        ctx2.lineCap = 'round';
        ctx2.beginPath(); ctx2.moveTo(40, 65); ctx2.lineTo(260, 65); ctx2.stroke();
        
        ctx2.lineCap = 'square';
        ctx2.beginPath(); ctx2.moveTo(40, 100); ctx2.lineTo(260, 100); ctx2.stroke();

        ctx2.lineWidth = 12;
        
        ctx2.lineJoin = 'miter';
        ctx2.strokeStyle = '#a855f7';
        ctx2.beginPath(); ctx2.moveTo(30, 160); ctx2.lineTo(85, 240); ctx2.lineTo(140, 160); ctx2.stroke();
        
        ctx2.lineJoin = 'round';
        ctx2.strokeStyle = '#f97316';
        ctx2.beginPath(); ctx2.moveTo(100, 160); ctx2.lineTo(155, 240); ctx2.lineTo(210, 160); ctx2.stroke();

        ctx2.lineJoin = 'bevel';
        ctx2.strokeStyle = '#06b6d4';
        ctx2.beginPath(); ctx2.moveTo(170, 160); ctx2.lineTo(225, 240); ctx2.lineTo(280, 160); ctx2.stroke();
    }

    // === ЗАДАНИЕ 3: Градиенты ===
    const canvas3 = document.getElementById('task3');
    if (canvas3) {
        const ctx3 = canvas3.getContext('2d');
        
        const linGrad = ctx3.createLinearGradient(20, 0, 280, 0);
        linGrad.addColorStop(0, '#ef4444');
        linGrad.addColorStop(0.35, '#eab308');
        linGrad.addColorStop(0.7, '#06b6d4');
        linGrad.addColorStop(1, '#3b82f6');
        
        ctx3.fillStyle = linGrad;
        ctx3.fillRect(20, 25, 260, 90);

        const radGrad = ctx3.createRadialGradient(150, 210, 5, 150, 210, 65);
        radGrad.addColorStop(0, '#ffffff');
        radGrad.addColorStop(0.3, '#f472b6');
        radGrad.addColorStop(0.75, '#8b5cf6');
        radGrad.addColorStop(1, '#4c1d95');
        
        ctx3.beginPath();
        ctx3.arc(150, 210, 65, 0, Math.PI * 2);
        ctx3.fillStyle = radGrad;
        ctx3.fill();
    }

    // === ЗАДАНИЕ 4: Сердце и тени ===
    const canvas4 = document.getElementById('task4');
    if (canvas4) {
        const ctx4 = canvas4.getContext('2d');
        
        ctx4.shadowOffsetX = 10;
        ctx4.shadowOffsetY = 10;
        ctx4.shadowBlur = 12;
        ctx4.shadowColor = 'rgba(15, 23, 42, 0.45)';
        
        ctx4.fillStyle = '#dc2626';
        ctx4.beginPath();
        ctx4.moveTo(150, 90);
        ctx4.bezierCurveTo(150, 75, 90, 35, 45, 90);
        ctx4.bezierCurveTo(-5, 155, 150, 235, 150, 280);
        ctx4.bezierCurveTo(150, 235, 305, 155, 255, 90);
        ctx4.bezierCurveTo(210, 35, 150, 75, 150, 90);
        ctx4.closePath();
        ctx4.fill();
    }

    // === ЗАДАНИЕ 5: Интерактивный холст ("Рисовалка") ===
    const canvas5 = document.getElementById('task5');
    if (canvas5) {
        const ctx5 = canvas5.getContext('2d');
        const colorPicker = document.getElementById('brushColor');
        const sizeSlider = document.getElementById('brushSize');
        const clearButton = document.getElementById('clearBtn');
        
        let activeDrawing = false;

        canvas5.addEventListener('mousedown', () => activeDrawing = true);
        canvas5.addEventListener('mouseup', () => activeDrawing = false);
        canvas5.addEventListener('mouseout', () => activeDrawing = false);
        
        canvas5.addEventListener('mousemove', (event) => {
            if (!activeDrawing) return;
            
            const boundaries = canvas5.getBoundingClientRect();
            const mouseX = event.clientX - boundaries.left;
            const mouseY = event.clientY - boundaries.top;
            
            const currentSize = sizeSlider.value;
            const currentColor = colorPicker.value;

            ctx5.beginPath();
            ctx5.arc(mouseX, mouseY, currentSize, 0, Math.PI * 2);
            ctx5.fillStyle = currentColor;
            ctx5.fill();
        });

        if (clearButton) {
            clearButton.addEventListener('click', () => {
                ctx5.clearRect(0, 0, canvas5.width, canvas5.height);
            });
        }
    }
});