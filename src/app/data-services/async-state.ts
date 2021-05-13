import { DependencyList, useCallback, useEffect, useState } from 'react';
import { KBError } from '../shared/interface';

export function useAsyncState<T>(
    load: () => Promise<T>,
    deps: DependencyList = [],
    condition = true
) {
    const [state, setState] = useState<State<T>>(initialState());

    const sendRequest = useCallback(() => {
        setState(loadingState());

        load()
            .then((result) => {
                setState(resolvedState(result));
            })
            .catch((reason) => {
                setState(rejectedState(reason));
            });
    }, deps);

    useEffect(() => {
        if (condition) {
            sendRequest();
        }
    }, deps);

    return state;
}

const initialState = () => ({ state: 'initial' } as const);
const loadingState = () => ({ state: 'loading' } as const);
const resolvedState = <T>(result: T) =>
    ({ state: 'resolved', result } as const);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const rejectedState = (error: KBError) =>
    ({ state: 'rejected', error } as const);

export type ResolvedState<T> = {
    state: 'resolved';
    result: T;
};

export type State<T> =
    | ReturnType<
          typeof initialState | typeof loadingState | typeof rejectedState
      >
    | ResolvedState<T>;
