import { Avatar, Tooltip } from "@material-ui/core";
import { WordCount, WordCountLength } from "Utils";
/**
 *@function UserAvatar.jsx
 *@author Azim
 *
 **/
const UserAvatar = ({ className, getAvatar, userId, getName, style }) => {
  return (
    <Tooltip title={getName(userId)} arrow>
      <Avatar
        style={style}
        className={className}
        src={getAvatar(userId)}
        alt={getName(userId)}
      >
        {getName(userId) &&
          (WordCountLength(getName(userId)) > 1
            ? `${WordCount(getName(userId))[0].charAt(0)}${WordCount(
                getName(userId)
              )[1].charAt(0)}`
            : `${WordCount(getName(userId))[0].charAt(0)}`)}
      </Avatar>
    </Tooltip>
  );
};

export default UserAvatar;
