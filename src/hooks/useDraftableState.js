import { useCallback, useRef, useState } from 'react';

export const useDraftableState = (initialState) => {
  const stateDraft = useRef(initialState);

  const [state, setState] = useState(initialState);

  const saveDraft = useCallback(() => {
    setState(stateDraft.current);
  }, []);

  return {
    state,
    stateDraft,
    saveDraft,
  }
}
