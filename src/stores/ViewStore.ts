import {observable} from 'mobx';
import { ALL_TODOS } from '../constants';

export default class ViewStore {
	@observable todoBeingEdited: any = null;
	@observable todoFilter= ALL_TODOS;
}