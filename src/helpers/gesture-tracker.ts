export default class GestureTracker {
   private touches: Touch[] = [];
   private gestureId = 0;

   track(element: HTMLElement, condition: 'Left' | 'Right' | 'Up' | 'Down', action: Function) {
      const trackingId = this.gestureId;
      element.addEventListener('touchstart', (event) => (this.touches[trackingId] = event.changedTouches[0]), false);
      element.addEventListener(
         'touchend',
         (event) => {
            this.handleGesture(this.touches[trackingId], event.changedTouches[0], condition, action);
         },
         false
      );
      this.gestureId++;
   }

   handleGesture(startTouch: Touch, endTouch: Touch, condition: 'Left' | 'Right' | 'Up' | 'Down', action: Function) {
      const deltaX = endTouch.screenX - startTouch.screenX;
      const deltaY = endTouch.screenY - startTouch.screenY;
      if (Math.abs(deltaX) < 100 && Math.abs(deltaY) < 100) return;
      if (deltaX < 0 && condition === 'Left') action();
      if (deltaX > 0 && condition === 'Right') action();
   }
}
