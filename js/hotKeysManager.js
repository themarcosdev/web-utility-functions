class HotKeyManager {
  constructor() {
    this.listeners = [];
  }

  register(keysArray, callback) {
    const normalizedKeys = keysArray.map(key => key.toLowerCase());
    let pressedKeys = new Set();
    let hasExecuted = false;

    const keyDownHandler = (event) => {
      pressedKeys.add(event.key.toLowerCase());

      if (normalizedKeys.every(key => pressedKeys.has(key)) && 
          normalizedKeys.length === pressedKeys.size) {
        if (!hasExecuted) {
          callback();
          hasExecuted = true;
        }
      }
    };

    const keyUpHandler = (event) => {
      pressedKeys.delete(event.key.toLowerCase());
      if (!pressedKeys.has(event.key.toLowerCase())) {
        hasExecuted = false;
      }
    };

    window.addEventListener('keydown', keyDownHandler);
    window.addEventListener('keyup', keyUpHandler);

    this.listeners.push({
      keysArray,
      keyDownHandler,
      keyUpHandler,
    });
  }

  unregister(keysArray) {
    const normalizedKeys = keysArray.map(key => key.toLowerCase());

    this.listeners = this.listeners.filter(listener => {
      if (JSON.stringify(listener.keysArray) === JSON.stringify(keysArray)) {
        window.removeEventListener('keydown', listener.keyDownHandler);
        window.removeEventListener('keyup', listener.keyUpHandler);
        return false; // Remove from listeners
      }
      return true;
    });
  }

  clearAll() {
    this.listeners.forEach(listener => {
      window.removeEventListener('keydown', listener.keyDownHandler);
      window.removeEventListener('keyup', listener.keyUpHandler);
    });
    this.listeners = [];
  }
}

/* Example */
let keyHotManager = new HotKeyManager();

keyHotManager.register(['control', 'Q'],      () => console.log('Control + Q pressed'));
keyHotManager.register(['shift', 'Q'],        () => console.log('Shift + Q pressed'));
keyHotManager.register(['shift', 'alt', 'Q'], () => console.log('Shift + Alt + Q pressed'));

// keyHotManager.unregister(['shift', 'Q']);
// keyHotManager.clearAll();
