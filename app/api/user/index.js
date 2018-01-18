import {Router} from 'express';
import * as controller from './user.controller';
import * as auth from '../auth/auth.service';

var router = new Router();

router.get('/',auth.isAuthenticated(), controller.index);
// router.delete('/:id', controller.destroy);
router.get('/me',auth.isAuthenticated(), controller.me);
// router.put('/:id/password', controller.changePassword);
// router.get('/:id',controller.show);
 router.post('/', controller.create);

module.exports = router;