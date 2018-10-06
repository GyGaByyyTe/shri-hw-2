document.addEventListener(
  "DOMContentLoaded",
  () => {
    // const //test1 = document.querySelector("#camera__//test-1");
    // const //test2 = document.querySelector("#camera__//test-2");
    // const //test3 = document.querySelector("#camera__//test-3");
    // const //test4 = document.querySelector("#camera__//test-4");
    // const //test5 = document.querySelector("#camera__//test-5");
    const theImage = document.querySelector("#main-image");

    //igore touch-events upon the element
    window.blockMenuHeaderScroll = false;
    window.addEventListener("touchstart", e => {
      if (e.target === theImage) {
        blockMenuHeaderScroll = true;
      }
    });
    window.addEventListener("touchend", () => {
      blockMenuHeaderScroll = false;
    });
    window.addEventListener("touchmove", e => {
      if (blockMenuHeaderScroll) {
        e.preventDefault();
      }
    });

    const addPointerHandle = element => {
      const MAX_SCALE = 3;
      const MAX_BRIGHTNESS = 1;
      let currentGesture = {};

      const nodeState = {
        moving: false,
        scaling: false,
        rotating: false,
        startPosition: { x: 0, y: 0 },
        scale: 1,
        brightness: 0.5,
        prevDist: 0,
        prevRotate: 0
      };

      element.addEventListener("pointerdown", event => {
        // Нужно для десктопа чтобы поймать pointerup вне DOM-ноды
        element.setPointerCapture(event.pointerId);

        currentGesture[event.pointerId] = {
          isPrimary: event.isPrimary,
          start: { x: event.x, y: event.y },
          prev: { x: event.x, y: event.y },
          prevTs: Date.now(),
          startPosition: {
            x: nodeState.startPosition.x,
            y: nodeState.startPosition.y
          }
        };

        if (event.isPrimary) {
          //test1.innerText = event.pointerId;
        } else {
          //test2.innerText = event.pointerId;
        }

        // //test3.innerText = Object.keys(currentGesture).length;

        if (Object.keys(currentGesture).length === 1) {
          nodeState.moving = true;
          //   touchStart(event);
        } else if (Object.keys(currentGesture).length === 2) {
          nodeState.moving = false;
          nodeState.scaling = true;
          nodeState.rotating = true;
          //   pinchStart(event);
          //   rotationStart(event);
        }
      });
      element.addEventListener("pointermove", event => {
        if (Object.keys(currentGesture).length == 0) {
          return;
        }

        if (nodeState.moving) {
          touchMove(event);
        }
        if (nodeState.scaling) {
          pinchMove(event);
        }
        if (nodeState.rotating) {
          rotationMove(event);
        }
      });

      const touchMove = event => {
        const { start, startPosition } = currentGesture[event.pointerId];
        const { x, y } = event;
        const dx = x - start.x;
        const dy = y - start.y;
        element.style.left = startPosition.x + dx + "px";
        element.style.top = startPosition.y + dy + "px";
        currentGesture[event.pointerId].prev = { x: x, y: y };
        nodeState.startPosition = {
          x: startPosition.x + dx,
          y: startPosition.y + dy
        };
      };

      const pinchMove = event => {
        const prev = [];
        const { x, y } = event;
        const { prevDist } = nodeState;

        for (index in currentGesture) {
          prev.push({
            x: currentGesture[index].prev.x,
            y: currentGesture[index].prev.y
          });
        }

        var dist = Math.sqrt(
          (prev[0].x - prev[1].x) * (prev[0].x - prev[1].x) +
            (prev[0].y - prev[1].y) * (prev[0].y - prev[1].y)
        );
        let k = 1;
        if (dist > prevDist) {
          k = 1.01;
        } else if (dist < prevDist) {
          k = 0.99;
        }
        let newScale = k * nodeState.scale;
        if (newScale > MAX_SCALE) {
          newScale = MAX_SCALE;
        }
        if (newScale <= 1) {
          newScale = 1;
        }

        nodeState.scale = newScale;
        nodeState.prevDist = dist;
        //test3.innerText = nodeState.scale;

        element.style.transform = `scale(${newScale},${newScale})`;

        currentGesture[event.pointerId].prev = { x: x, y: y };
        //test4.innerText = dist;
      };

      const rotationMove = event => {
        const prev = [];
        const { x, y } = event;
        const { prevRotate } = nodeState;

        for (index in currentGesture) {
          prev.push({
            x: currentGesture[index].prev.x,
            y: currentGesture[index].prev.y
          });
        }
        var rotate = Math.atan(
          (prev[1].y - prev[0].y) / (prev[1].x - prev[0].x)
        );
        if (Math.abs(rotate - prevRotate) > 3) {
          rotate = rotate - Math.PI;
        }

        let k = 1;
        if (rotate > prevRotate) {
          k = 1.01;
        } else if (rotate < prevRotate) {
          k = 0.99;
        }
        let newBrightness = k * nodeState.brightness;
        if (newBrightness > MAX_BRIGHTNESS) {
          newBrightness = MAX_BRIGHTNESS;
        }
        if (newBrightness <= 0) {
          newBrightness = 0;
        }

        nodeState.brightness = newBrightness;
        nodeState.prevRotate = rotate;
        // //test5.innerText = nodeState.brightness;

        currentGesture[event.pointerId].prev = { x: x, y: y };
      };

      const touchStopHandle = event => {
        if (Object.keys(currentGesture).length < 1) {
          return;
        }

        if (currentGesture[event.pointerId].isPrimary) {
          //test1.innerText = 0;
        } else {
          //test2.innerText = 0;
        }

        if (nodeState.moving) {
          //   touchEnd(e);
          nodeState.moving = false;
        }
        if (nodeState.scaling) {
          //   pinchEnd(e);
          nodeState.scaling = false;
        }
        if (nodeState.rotating) {
          //   rotationEnd(e);
          nodeState.rotating = false;
        }

        delete currentGesture[event.pointerId];
        // //test3.innerText = Object.keys(currentGesture).length;
      };
      element.addEventListener("pointerup", touchStopHandle);
      element.addEventListener("pointercancel", touchStopHandle);
    };
    addPointerHandle(theImage);
  },
  false
);
