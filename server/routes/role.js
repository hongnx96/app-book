const express = require('express');
const passport = require('passport');

const RoleController = require('./../controllers/role');
const { tables, validateBody, validateParamsRole } = require('./../helpers/routeHelpers');

const router = express.Router();

router.route('/search')
    .post(
        passport.authenticate('jwt', { session: false }),
        RoleController.showSearchRole
    );

router.route('/')
    .post(
        passport.authenticate('jwt', { session: false }),
        validateBody(tables.roleTable),
        RoleController.createRole
    );

router.route('/:id')
    .delete(
        passport.authenticate('jwt', { session: false }),
        validateParamsRole(tables.idTable, 'id'),
        RoleController.deleteRole
    )
    .get(
        passport.authenticate('jwt', { session: false }),
        validateParamsRole(tables.idTable, 'id'),
        RoleController.showRoleById
    )
    .put(
        passport.authenticate('jwt', { session: false }),
        validateParamsRole(tables.idTable, 'id'),
        validateBody(tables.roleUpdateTable),
        RoleController.updateRole
    );

module.exports = router;