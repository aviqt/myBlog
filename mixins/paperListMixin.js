import Experiment1 from "@/components/papers/Experiment1"
import Experiment2 from "@/components/papers/Experiment2"
import Experiment3 from "@/components/papers/Experiment3"
import Experiment4 from "@/components/papers/Experiment4"
import Experiment5 from "@/components/papers/Experiment5"
import Experiment6 from "@/components/papers/Experiment6"
import Experiment7 from "@/components/papers/Experiment7"
import Experiment8 from "@/components/papers/Experiment8"
  
export default {
  data() {
    return {
      paperList: [
        {name: '实验1：测量物质的密度' , id: 1, com: Experiment1},
        {name: '实验2：探究凸透镜成像' , id: 2, com: Experiment2},
        {name: '实验3：探究杠杆的平衡条件' , id: 3, com: Experiment3},
        {name: '实验4：测定小灯泡的电功率' , id: 4, com: Experiment4},
        {name: '实验5：实验室制取二氧化碳' , id: 5, com: Experiment5},
        {name: '实验6：科学实验基本操作' , id: 6, com: Experiment6},
        {name: '实验7：探究稀硫酸的化学性质' , id: 7, com: Experiment7},
        {name: '实验8：粗盐提纯—过滤' , id: 8, com: Experiment8},
      ]
    }
  }
}