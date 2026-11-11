const mapGridStyle = {
  backgroundImage:
    "linear-gradient(#c9d4ff 1px, transparent 1px), linear-gradient(90deg, #c9d4ff 1px, transparent 1px)",
  backgroundSize: "32px 32px",
};

export default function GridPattern() {
  return <div className="absolute inset-0 opacity-60" style={mapGridStyle} />;
}
