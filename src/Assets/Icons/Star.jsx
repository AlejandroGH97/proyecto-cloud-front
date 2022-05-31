const Star = (props) => {
  if (props.isFav !== undefined) {
  }
  return (
    <svg
      className={props.class}
      onClick={(event) => {
        event.stopPropagation();
        props.clicked();
      }}
      width={props.width}
      height={props.height}
      viewBox="0 0 24 24"
      id="star_filled"
      data-name="star filled"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill={props.isFav !== undefined ? "#ffd700" : ""}
        id="Star"
        d="M10,15,4.122,18.09l1.123-6.545L.489,6.91l6.572-.955L10,0l2.939,5.955,6.572.955-4.755,4.635,1.123,6.545Z"
        transform="translate(2 3)"
      />
    </svg>
  );
};

export default Star;
