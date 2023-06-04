/* eslint-disable react/function-component-definition */
import "./VideoNode.scss";

export interface IProps {
    id: number
    done: boolean
    level: number
    isLeaf: boolean
    setOrder: Array<number>
}

const VideoNode = (props: IProps) => {
    return (
        <div className="VideoNode"></div >
    )

}

export default VideoNode
