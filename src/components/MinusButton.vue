<template>
  <svg
    width="56"
    height="46"
    viewBox="0 0 56 46"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g filter="url(#filterminusbutton)">
      <rect
        x="1.5"
        y="1.5"
        width="45"
        height="35"
        rx="9.5"
        fill="#999999"
        fill-opacity="0.22"
        stroke="#363D6B"
      />
    </g>
    <path
      d="M27 16L21 16H14V22.0078H21H27H34V16L27 16Z"
      fill="white"
      fill-opacity="0.26"
    />
    <defs>
      <filter
        id="filterminusbutton"
        x="0"
        y="0"
        width="56"
        height="46"
        filterUnits="userSpaceOnUse"
        color-interpolation-filters="sRGB"
      >
        <feFlood flood-opacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dx="4" dy="4" />
        <feGaussianBlur stdDeviation="2.5" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_51_188"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_51_188"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
</template>

<script>
export default {
  name: "MinusButton",
}
</script>

<style scoped></style>
