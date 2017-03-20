/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import sequelize from '../sequelize';
import User from './User';
import UserLogin from './UserLogin';
import UserClaim from './UserClaim';
import UserProfile from './UserProfile';
import Activity from './Activity';
import Check from './Check';
import Comment from './Comment';
import Post from './Post';
import Tag from './Tag';

User.hasMany(UserLogin, {
  foreignKey: 'userId',
  as: 'logins',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

User.hasMany(UserClaim, {
  foreignKey: 'userId',
  as: 'claims',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

User.hasOne(UserProfile, {
  foreignKey: 'userId',
  as: 'profile',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

Activity.belongsTo(User, {
  as: 'fromUser',
  foreignKey: 'fromUserId',
});

Activity.belongsTo(User, {
  as: 'toUser',
  foreignKey: 'toUserId',
});
//
Activity.belongsTo(Post);

Post.belongsTo(User);

Post.hasMany(Comment);

Post.hasMany(Check);

Check.belongsTo(User);

Comment.belongsTo(User);

Tag.belongsToMany(Post, { through: 'PostTags' });
Post.belongsToMany(Tag, { through: 'PostTags' });


function sync(...args) {
  return sequelize.sync(...args);
}

export default { sync };
export { User, UserLogin, UserClaim, UserProfile, Activity, Check, Comment, Post, Tag };
