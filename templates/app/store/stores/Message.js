import { observable, action} from 'mobx';

export default class Message {
    @observable numLikes = 0;
    @observable loggedInUserHasLiked = false;

    @action like = () => {
        if (this.loggedInUserHasLiked) {
            return Promise.resolve(); // already liked
        }

        this.numLikes++;
        this.loggedInUserHasLiked = true;

        return api.like().catch(error => {
            this.numLikes--;
            this.loggedInUserHasLiked = false;
            throw error;
        });
    }

    @action unlike = () => {
        if (!this.loggedInUserHasLiked) {
            return Promise.resolve(); // not yet liked
        }

        this.numLikes--;
        this.loggedInUserHasLiked = false;

        return api.unlike().catch(error => {
            this.numLikes++;
            this.loggedInUserHasLiked = true;
            throw error;
        });
    }
}
