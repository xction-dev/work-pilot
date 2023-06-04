import styles from "./DiagramTest.module.scss";
import { videos } from "../../data/entity/video"
import VideoNode from "../../data/entity/VideoNode";

export default function DiagramTest() {

    return (
        <div className={styles.DiagramTest}>
            <div className={styles.NodeContainer}>
                <div className={styles.wrapper0}>
                    <VideoNode id={0} done={false} level={0} isLeaf={false} setOrder={[1, 0]} />
                </div>
                <div className={styles.wrapper1}>
                    <VideoNode id={1} done={false} level={1} isLeaf={false} setOrder={[1, 0]} />
                </div>
                <div className={styles.wrapper2}>
                    <VideoNode id={2} done={false} level={2} isLeaf={false} setOrder={[3, 0]} />
                </div>
                <div className={styles.wrapper3}>
                    <VideoNode id={3} done={false} level={2} isLeaf={true} setOrder={[3, 1]} />
                </div>
                <div className={styles.wrapper4}>
                    <VideoNode id={4} done={false} level={2} isLeaf={true} setOrder={[3, 2]} />
                </div>
                <div className={styles.wrapper5}>
                    <VideoNode id={5} done={false} level={3} isLeaf={true} setOrder={[3, 0]} />
                </div>
                <div className={styles.wrapper6}>
                    <VideoNode id={6} done={false} level={3} isLeaf={true} setOrder={[3, 1]} />
                </div>
                <div className={styles.wrapper7}>
                    <VideoNode id={7} done={false} level={3} isLeaf={false} setOrder={[3, 2]} />
                </div>
                <div className={styles.wrapper8}>
                    <VideoNode id={8} done={false} level={4} isLeaf={true} setOrder={[2, 0]} />
                </div>
                <div className={styles.wrapper9}>
                    <VideoNode id={9} done={false} level={4} isLeaf={true} setOrder={[2, 1]} />
                </div>


            </div>
        </div >
    )


}
