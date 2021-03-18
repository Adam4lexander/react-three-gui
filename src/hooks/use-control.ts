import { useState, useEffect, useContext } from 'react';
import { useSpring } from '@react-spring/three';
import { ControlsContext } from '../contexts/controls-context';
import { ControlOptions, ControlItem } from '../types';
import { defaultOptions, defaultValue } from '../utils';

export const useControl = (
  name: string,
  options: ControlOptions = defaultOptions
) => {
  const context = useContext(ControlsContext);
  const [id, setId] = useState<string | null>(null);
  let [value, setValue] = useState(defaultValue(options));

  const [spring, setSpring] = useSpring(() => ({
    value,
    config: typeof options.spring === 'object' ? options.spring : undefined,
  }));
  const setSpringValue = (springValue: any) => setSpring({ value: springValue });

  if (options.state) {
    value = options.state[0];
    setValue = options.state[1];
  }

  useEffect(() => {
    if (context.state.current && id) {
      if (options.spring) {
        context.state.current.set(id, setSpringValue);
      } else {
        context.state.current.set(id, setValue);
      }
    }
  }, [context.state, id]);

  useEffect(() => {
    const ctrl = context.addControl({
      id: options.id,
      name,
      value,
      options,
    } as ControlItem);
    setId(ctrl.id);
    return () => {
      context.removeControl(ctrl);
    };
  }, []);

  useEffect(() => {
    options.spring && void setSpring({ value });
    options.onChange && void options.onChange(value);

    // prevent stale gui
    id && context.gui.current?.get(id)?.(value)

  }, [options, setSpring, value]);

  if (options.spring) {
    return spring.value;
  }

  return value;
};
