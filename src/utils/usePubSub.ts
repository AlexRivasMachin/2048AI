import { useEffect } from 'react';
import { EventEmitter } from 'eventemitter3';

const emitter = new EventEmitter();

export const useSub = (event: string, callback) => {
  const unsubscribe = () => {
    emitter.off(event, callback);
  };

  useEffect(() => {
    emitter.on(event, callback);
    return unsubscribe;
  }, []);

  return unsubscribe;
};

export const usePub = () => {
    return (event: string, data: string) => {
      emitter.emit(event, data);
    };
  };