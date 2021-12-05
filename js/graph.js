function getDimension(canvas) {
  const w = canvas.width;
  const h = canvas.height;
  return Math.round(Math.min(w, h) * 0.8);
}

function getBounds(canvas, dim) {
  const w = canvas.width;
  const h = canvas.height;
  const cx = w / 2;
  const cy = h / 2;
  return [
      [[cx - dim/2, cy - dim/2], [cx + dim/2, cy - dim/2]],
      [[cx - dim/2, cy + dim/2], [cx + dim/2, cy + dim/2]]
    ];
}

export function drawGraph(canvas, opts) {
  const ctx = canvas.getContext("2d");

  function render() {
    const dim = getDimension(canvas);
    const bounds = getBounds(canvas, dim);
    ctx.lineWidth = 4;
    ctx.clearRect(0, 0, 1000000, 1000000);
    ctx.beginPath();
    ctx.moveTo(bounds[0][0][0], bounds[0][0][1]);
    ctx.lineTo(bounds[1][0][0], bounds[1][0][1]);
    ctx.lineTo(bounds[1][1][0], bounds[1][1][1]);
    ctx.stroke();

    ctx.font = "24px Verdana sans-serif";
    ctx.textAlign = "center";
    ctx.save();
    ctx.translate(canvas.width / 2 - dim/2 - 40, canvas.height / 2);

    ctx.rotate(-Math.PI / 2);
    ctx.fillText(opts.l1, 0, 0);


    ctx.restore();
    ctx.fillText(opts.l2, canvas.width / 2, canvas.height / 2 + dim/2 + 40);


    ctx.lineWidth = 2;
    const xaxis = opts.xaxis;
    const yaxis = opts.yaxis;
    let mainStepX = Math.pow(10, Math.floor(Math.log10(xaxis)) - 1);
    let mainStepY = Math.pow(10, Math.floor(Math.log10(yaxis)) - 1);
    let secStepX = mainStepX / 5;
    let secStepY = mainStepY / 5;


    ctx.font = "12px Verdana sans-serif";
    ctx.beginPath();
    let x = bounds[1][0][0];
    let y = bounds[1][0][1];
    for(let i = 1; i < Math.floor(xaxis/mainStepX) + 1; i++) {
      ctx.moveTo(x + i * mainStepX * dim / xaxis, y + 10);
      ctx.lineTo(x + i * mainStepX * dim / xaxis, y - 10);
      ctx.stroke();
      ctx.fillText("" + i * mainStepX, x + i * mainStepX * dim / xaxis, y + 20);
    }

    ctx.beginPath();
    ctx.textAlign = "right";
    x = bounds[1][0][0];
    y = bounds[1][0][1];
    for(let i = 1; i < Math.floor(yaxis/mainStepY) + 1; i++) {
      ctx.moveTo(x + 10, y - i * mainStepY * dim / yaxis);
      ctx.lineTo(x - 10, y - i * mainStepY * dim / yaxis);
      ctx.stroke();
      ctx.fillText("" + i * mainStepY, x - 20, y - i * mainStepY * dim / yaxis + 6);
    }

    ctx.beginPath();
    x = bounds[1][0][0];
    y = bounds[1][0][1];
    for(let i = 1; i < Math.floor(xaxis/secStepX); i++) {
      ctx.moveTo(x + i * secStepX * dim / xaxis, y + 5);
      ctx.lineTo(x + i * secStepX * dim / xaxis, y - 5);
      ctx.stroke();
    }

    ctx.beginPath();
    x = bounds[1][0][0];
    y = bounds[1][0][1];
    for(let i = 1; i < Math.floor(yaxis/secStepY); i++) {
      ctx.moveTo(x + 5, y - i * secStepY * dim / yaxis);
      ctx.lineTo(x - 5, y - i * secStepY * dim / yaxis);
      ctx.stroke();
    }

    function ppc() {
      ctx.beginPath();
      ctx.moveTo(x, y - 8 * dim / yaxis);
      ctx.textAlign = "left";
      const f = x => 10 - x*13/100*Math.sin(2) + 2 * Math.sin(x / 50);
      for(let i = 0; i < xaxis; i++) {
        ctx.lineTo(x + i * dim / xaxis, y - (f(i)>0?f(i):0) * dim / yaxis);
        if(f(i) < 0 || i == xaxis - 1) {
          ctx.fillText("PPC", x + i * dim / xaxis, y - (f(i)>0?f(i):0) * dim / yaxis - 5)
        }
      }
      ctx.stroke();
    }

    if(opts.type == "ppc") ppc();


    window.requestAnimationFrame(render);
  }

  render();
}
