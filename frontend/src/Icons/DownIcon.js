const DownIcon = ({ className }) => {
  return (
    <svg
      className={className}
      width="33"
      height="34"
      viewBox="0 0 33 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xlink="http://www.w3.org/1999/xlink"
    >
      <rect width="33" height="34" fill="url(#pattern0)" />
      <defs>
        <pattern
          id="pattern0"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use
            href="#image0_23_22"
            transform="matrix(0.00195312 0 0 0.00208939 0 -0.0348837)"
          />
        </pattern>
        <image
          id="image0_126_42"
          width="512"
          height="512"
          href="data:image/png;base64,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"
        />
      </defs>
    </svg>
  );
};
export default DownIcon;
