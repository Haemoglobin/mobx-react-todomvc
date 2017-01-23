import {reaction} from 'mobx';
import State from '../state/state';
let state = State.getState();

export default {
    subscribeToState: () => {
		reaction(
			() => state.toJS(),
			todos => fetch('/api/todos', {
				method: 'post',
				body: JSON.stringify({ todos }),
				headers: new Headers({ 'Content-Type': 'application/json' })
			})
		);
	}
}
    