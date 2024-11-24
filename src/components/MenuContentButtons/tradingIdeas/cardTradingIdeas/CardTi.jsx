import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

export const MediaCard = ({ title, img, text }) => {
  return (
    <Card sx={{ maxWidth: 360, borderRadius:"2rem", marginBottom:"0.5rem" }}>
      <CardMedia sx={{ height: 180}} image={img} title={title} />
      <CardContent sx={{ height: 200}}>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {text}
        </Typography>
      </CardContent>
    </Card>
  );
};
