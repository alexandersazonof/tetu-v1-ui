import { IconDefinition } from '@ant-design/icons-angular';

export const UsdtIcon: IconDefinition = {
  name: 'usdt-icon',
  theme: 'outline',
  icon: `
<svg width="32px" height="32px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <defs>
        <circle id="path-pr3u9xslo4-1" cx="16" cy="16" r="16"></circle>
        <pattern id="pattern-pr3u9xslo4-3" patternUnits="objectBoundingBox" x="0.705622146%" width="99.2943779%" height="100%">
            <use xlink:href="#image-pr3u9xslo4-4" transform="scale(0.126193607,0.126193607)"></use>
        </pattern>
        <image id="image-pr3u9xslo4-4" width="250" height="219" xlink:href="data:image/png;base64,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"></image>
    </defs>
    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g id="wmatic">
            <mask id="mask-pr3u9xslo4-2" fill="white">
                <use xlink:href="#path-pr3u9xslo4-1"></use>
            </mask>
            <g id="Oval"></g>
            <g id="Group" mask="url(#mask-pr3u9xslo4-2)" fill-rule="nonzero">
                <circle id="Oval" fill="#03AC84" cx="16" cy="16" r="16"></circle>
                <rect id="Rectangle" fill="url(#pattern-pr3u9xslo4-3)" x="0" y="3.63635" width="32" height="27.6364"></rect>
            </g>
        </g>
    </g>
</svg>`,
};