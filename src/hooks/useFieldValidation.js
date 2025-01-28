import { useDraftableState } from '@/hooks/useDraftableState';
import { useCallback } from 'react';

const initStateMap = (keys) => {
  const formFieldStateMap = new Map();

  keys.forEach(key => {
    formFieldStateMap.set(key, {
      passed: false,
      dirty: false
    });
  });

  return formFieldStateMap;
}

const validateStateMap = (formFieldDataMap, password) => {
  const formFieldStateMap = new Map();

  formFieldDataMap.forEach((_, key) => {
    formFieldStateMap.set(key, {
      dirty: true,
      passed: formFieldDataMap.get(key).test(password),
    });
  })

  return formFieldStateMap;
}

export const useFieldValidation = (tests) => {
  const {
    state,
    stateDraft,
    applyDraft,
  } = useDraftableState(initStateMap(tests.keys()));

  const validate = useCallback((value) => {
    return validateStateMap(tests, value);
  }, [tests])

  return {
    state,
    stateDraft,
    applyDraft,
    validate,
  }
}
