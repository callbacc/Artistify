import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import uuid from "react-uuid";
import { formatVideoTitle } from "../../../functions";
import {
  PlayArrow as PlayArrowIcon,
  Pause as PauseIcon,
  Queue as QueueIcon,
  Info as InfoIcon
} from '@material-ui/icons';

const useStyles = makeStyles({
  root: {
    maxWidth: 225,
    height: 185,
  },
  media: {
    height: 125,
  },
  titleSize: {
    fontSize: 10,
  },
});


export default function MediaCard({
  title,
  description,
  thumbnailUrl,
  smallThumbnailUrl,
  id,
  setNowPlaying,
  nowPlaying,
  queue,
  setQueue,
}) {
  const classes = useStyles();
  const [playing, setPlaying] = useState(false);

  useEffect(() => {

    if (nowPlaying && nowPlaying.id === id) {
      setPlaying(true);
    } else {
      setPlaying(false);
    }
  }, [nowPlaying]);

  function handlePlayButton() {
    if (nowPlaying) {
      return handleAddQueue()
    } else {

      if (!playing) {
        setNowPlaying({
          title: title,
          description: description,
          id: id,
          thumbnailUrl: thumbnailUrl,
        });
        setPlaying(true);
      } else {
        setNowPlaying({});
        setPlaying(false);
      }


    }
  }


  function handleAddQueue() {
    setQueue(
      queue.concat({
        title: title,
        description: description,
        id: id,
        qid: uuid(),
        thumbnailUrl: thumbnailUrl,
        smallThumbnailUrl: smallThumbnailUrl,
      })
    );
  }

  return (
    <Card className={classes.root}>
      <CardActionArea onClick={handlePlayButton}>
        <CardMedia
          className={classes.media}
          image={thumbnailUrl}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography className={classes.titleSize} gutterBottom variant="h5" component="h2">
            {formatVideoTitle(title)}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}



// this is the old cards
// import React, { useState, useEffect } from "react";
// import uuid from "react-uuid";
// import { formatVideoTitle } from "../../../functions";
// import { makeStyles } from "@material-ui/core/styles";
// import {
//   Card,
//   CardContent,
//   CardMedia,
//   IconButton,
//   Typography,
//   Tooltip
// } from "@material-ui/core";
// import {
//   PlayArrow as PlayArrowIcon,
//   Pause as PauseIcon,
//   Queue as QueueIcon,
//   Info as InfoIcon
// } from '@material-ui/icons';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     display: "flex",
//     maxWidth: 365,
//     height: 130,
//     margin: "0px auto 20px auto",
//   },
//   details: {
//     display: "flex",
//     flexDirection: "column",
//   },
//   content: {
//     flex: "1 0 auto",
//   },
//   cover: {
//     width: 151,
//     height: 140,
//     marginLeft: "auto",
//   },
//   controls: {
//     display: "flex",
//     alignItems: "center",
//     paddingLeft: theme.spacing(1),
//     paddingBottom: theme.spacing(1),
//   },
//   playIcon: {
//     height: 38,
//     width: 38,
//   },
//   titleSize: {
//     fontSize: 16,
//   },
// }));

// export default function MediaControlCard({
//   title,
//   description,
//   thumbnailUrl,
//   smallThumbnailUrl,
//   id,
//   setNowPlaying,
//   nowPlaying,
//   queue,
//   setQueue,
// }) {
//   const classes = useStyles();
//   const [playing, setPlaying] = useState(false);

//   useEffect(() => {
//     if (nowPlaying && nowPlaying.id === id) {
//       setPlaying(true);
//     } else {
//       setPlaying(false);
//     }
//   }, [nowPlaying]);

//   function handlePlayButton() {
//     if (!playing) {
//       setNowPlaying({
//         title: title,
//         description: description,
//         id: id,
//         thumbnailUrl: thumbnailUrl,
//       });
//       setPlaying(true);
//     } else {
//       setNowPlaying({});
//       setPlaying(false);
//     }
//   }

  // function handleAddQueue() {
  //   setQueue(
  //     queue.concat({
  //       title: title,
  //       description: description,
  //       id: id,
  //       qid: uuid(),
  //       thumbnailUrl: thumbnailUrl,
  //       smallThumbnailUrl: smallThumbnailUrl,
  //     })
  //   );
  // }

//   return (
//     <Card className={classes.root} style={{ backgroundColor: playing && "#2ad156" }}>
//       <div className={classes.details}>
//         <CardContent className={classes.content} style={{ height: "60px" }}>
//           <Typography className={classes.titleSize} component="h5" variant="h5">
//             {formatVideoTitle(title)}
//           </Typography>
//         </CardContent>
//         <div className={classes.controls}>

//           {/* play/stop button */}
//           <Tooltip title={playing ? "stop" : "play"}>
//             <IconButton size="small" onClick={handlePlayButton} >
//               {playing ? <PauseIcon /> : <PlayArrowIcon />}
//             </IconButton>
//           </Tooltip>

//           {/* queue button */}
//           <Tooltip title="add to queue">
//             <IconButton size="small" onClick={handleAddQueue}>
//               <QueueIcon />
//             </IconButton>
//           </Tooltip>

//           <Tooltip title={description} >
//             <InfoIcon color="disabled" />
//           </Tooltip>

//         </div>
//       </div>
//       <CardMedia
//         className={classes.cover}
//         component="img"
//         alt={title}
//         image={thumbnailUrl}
//         title={title}
//       />
//     </Card>
//   );
// }
