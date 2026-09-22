const textToType = "🌻 FELIZ DÍA DE LAS FLORES AMARILLAS 🌻\n\nCada girasol que ves aquí es un latido de mi corazón.\n\nAsí como el sol ilumina los campos, tú iluminas mi vida.\n\nDe Taty, para Kiwi ❤️";

$(function() {
    const canvas = $('#canvas')[0];
    const ctx = canvas.getContext("2d");
    const $btn = $('#start-btn');
    const $mainContent = $('#main-content');
    const $messageDiv = $('#message');

    canvas.width = 600; 
    canvas.height = 600;

    $btn.click(function() {
        $btn.hide();
        $mainContent.css('display', 'flex');
        drawTree();
    });

    function drawTree() {
        let progress = 0;
        
        function animateTrunk() {
            if (progress < 1) {
                progress += 0.02;
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                
                ctx.beginPath();
                ctx.moveTo(300, 580);
                ctx.quadraticCurveTo(300, 380, 300, 280);
                ctx.lineWidth = 18;
                ctx.strokeStyle = '#1b4d3e';
                ctx.lineCap = 'round';
                ctx.stroke();

                if (progress > 0.5) {
                    ctx.beginPath();
                    ctx.moveTo(300, 420);
                    ctx.quadraticCurveTo(240, 360, 210, 300);
                    ctx.moveTo(300, 390);
                    ctx.quadraticCurveTo(360, 330, 390, 280);
                    ctx.lineWidth = 10;
                    ctx.stroke();
                }

                requestAnimationFrame(animateTrunk);
            } else {
                drawHeartFlowers();
            }
        }
        animateTrunk();
    }

    function drawHeartFlowers() {
        let flowers = [];
        const totalFlowers = 700;

        for (let i = 0; i < totalFlowers; i++) {
            let t = Math.PI * 2 * Math.random();
            let r = Math.sqrt(Math.random());
            
            let heartX = 16 * Math.pow(Math.sin(t), 3);
            let heartY = -(13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t));
            
            let x = 300 + (r * heartX * 9.5) + (Math.random() * 6 - 3);
            let y = 200 + (r * heartY * 9.5) + (Math.random() * 6 - 3);

            flowers.push({
                x: x,
                y: y,
                size: Math.random() * 3 + 8
            });
        }

        let count = 0;
        function animateFlowers() {
            if (count < flowers.length) {
                let f = flowers[count];
                drawSunflower(f.x, f.y, f.size);
                count++;
                setTimeout(animateFlowers, 4);
            } else {
                typeMessage();
            }
        }
        animateFlowers();
    }

    function drawSunflower(x, y, radius) {
        ctx.fillStyle = '#ffcc00';
        for (let i = 0; i < 12; i++) {
            let angle = (i * Math.PI) / 6;
            let px = x + Math.cos(angle) * radius;
            let py = y + Math.sin(angle) * radius;
            ctx.beginPath();
            ctx.arc(px, py, radius / 2, 0, Math.PI * 2);
            ctx.fill();
        }
        ctx.beginPath();
        ctx.arc(x, y, radius / 1.8, 0, Math.PI * 2);
        ctx.fillStyle = '#4a2c11';
        ctx.fill();
    }

    function typeMessage() {
        let index = 0;
        function type() {
            if (index < textToType.length) {
                let char = textToType.charAt(index);
                $messageDiv.append(char === '\n' ? '<br>' : char);
                index++;
                setTimeout(type, 45);
            }
        }
        type();
    }
});
