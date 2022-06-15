<!--
 * @Author: 王欣磊
 * @Date: 2022-06-10 09:53:40
 * @LastEditors: 王欣磊
 * @LastEditTime: 2022-06-15 17:37:41
 * @Description: 
 * @FilePath: /mmsi-demo-v3/src/App.vue
-->
<script setup lang="ts">
import { ref } from "vue";
import "flag-icons";
import { MMSI } from "mmsi.js";
import nationCode from "./data/nationCode";
const getNationDataByMMSI = function (mmsi: string): {
  code: string;
  name: string;
  enName: string;
  flagCode: string;
} {
  const m = new MMSI(parseInt(mmsi))?.jurisdiction;
  const flagCode = m?.code.split(",").length
    ? m?.code.split(",")[0].split("-")[0]
    : m?.code.split("-")[0] || "";
  if (mmsi.toString().startsWith("335")) {
    return {
      code: "HN",
      flagCode: "HN",
      enName: "Honduras",
      name: nationCode["HN" as keyof typeof nationCode] || "未知",
    };
  }
  if (mmsi.toString().startsWith("550")) {
    return {
      code: "TL",
      flagCode: "TL",
      enName: "Timor-Leste (Democratic Republic of)",
      name: nationCode["TL" as keyof typeof nationCode] || "未知",
    };
  }
  return {
    code: m?.code || "",
    flagCode,
    enName: m?.name,
    name: nationCode[flagCode as keyof typeof nationCode] || "未知",
  };
};
const mmsis = [
  201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212, 213, 214, 215,
  216, 218, 219, 220, 224, 225, 226, 227, 228, 229, 230, 231, 232, 233, 234,
  235, 236, 237, 238, 239, 240, 241, 242, 243, 244, 245, 246, 247, 248, 249,
  250, 251, 252, 253, 254, 255, 256, 257, 258, 259, 261, 262, 263, 264, 265,
  266, 267, 268, 269, 270, 271, 272, 273, 274, 275, 276, 277, 278, 279, 301,
  303, 304, 305, 306, 306, 306, 307, 308, 309, 310, 311, 312, 314, 316, 319,
  321, 323, 325, 327, 329, 330, 331, 332, 334, 336, 338, 339, 341, 343, 345,
  347, 348, 350, 351, 352, 353, 354, 355, 356, 357, 358, 359, 361, 362, 364,
  366, 367, 368, 369, 370, 371, 372, 373, 374, 375, 376, 377, 378, 379, 401,
  403, 405, 408, 410, 412, 413, 414, 416, 417, 419, 422, 423, 425, 428, 431,
  432, 434, 436, 437, 438, 440, 441, 443, 445, 447, 450, 451, 453, 455, 457,
  459, 461, 463, 466, 468, 470, 471, 472, 473, 475, 477, 478, 501, 503, 506,
  508, 510, 511, 512, 514, 515, 516, 518, 520, 523, 525, 529, 531, 533, 536,
  538, 540, 542, 544, 546, 548, 550, 553, 555, 557, 559, 561, 563, 564, 565,
  566, 567, 570, 572, 574, 576, 577, 578, 601, 603, 605, 607, 608, 609, 610,
  611, 612, 613, 615, 616, 617, 618, 619, 620, 621, 622, 624, 625, 626, 627,
  629, 630, 631, 632, 633, 634, 635, 636, 637, 638, 642, 644, 645, 647, 649,
  650, 654, 655, 656, 657, 659, 660, 661, 662, 663, 664, 665, 666, 667, 668,
  669, 670, 671, 672, 674, 675, 676, 677, 678, 679, 701, 710, 720, 725, 730,
  735, 740, 745, 750, 755, 760, 765, 770, 775,
].map((_) => _.toString());
const filter = ref("");
</script>

<template>
  <div
    style="
      display: flex;
      flex-direction: column;
      align-items: center;
      position: sticky;
      top: 0;
      background: #c3c3c3;
      width: 100vw;
      padding: 10px;
      z-index: 99;
    "
  >
    <h1>MMSI对照表</h1>
    <div style="display: flex; align-items: center">
      <span style="margin-right: 10px">过滤:</span>
      <input v-model="filter" placeholder="请输入mmsi" />
    </div>
  </div>
  <table style="margin-top: 20px">
    <tr>
      <th>MMSI</th>
      <th>CODE</th>
      <th>中文名</th>
      <th>英文名</th>
      <th>国旗</th>
    </tr>
    <tr
      v-for="i in mmsis.filter((_) => _.startsWith(filter.slice(0, 3)))"
      :style="{
        background:
          getNationDataByMMSI(i + '999999').name === '未知' ? 'red' : 'unset',
      }"
    >
      <td>{{ i }}xxxxxx</td>
      <td>{{ getNationDataByMMSI(i + "999999").code }}</td>
      <td>{{ getNationDataByMMSI(i + "999999").name }}</td>
      <td>{{ getNationDataByMMSI(i + "999999").enName }}</td>
      <td>
        <span
          class="fi"
          style="width: 30px"
          :class="[
            `fi-${getNationDataByMMSI(i + '999999').flagCode.toLowerCase()}`,
          ]"
        ></span>
      </td>
    </tr>
  </table>
</template>

<style>
body {
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;

  display: flex;
  align-items: center;
  flex-direction: column;

  text-align: center;

  color: #2c3e50;

  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

table {
  border-spacing: 0;
  border-collapse: collapse;
}

td,
th {
  padding: 5px 10px;

  border: 1px solid #ccc;
}

</style>
