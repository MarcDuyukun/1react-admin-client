import React from "react";
import { Upload, Icon, Modal, message } from "antd";
import PropTypes from 'prop-types'
import {reqDeletImg} from '../../api'
import {BASE_IMG} from '../../utils/Constants'

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

export default class PicturesWall extends React.Component {
    static propTypes={
        imgs:PropTypes.array
    }
  state = {
    previewVisible: false,
    previewImage: "",
    fileList: [
    ],
  };
  getImgs=()=>{
      return this.state.fileList.map(item=>item.name)
  }
  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    });
  };

  handleChange = async ({ file,fileList }) =>{
     if(file.status==='done'){
         file=fileList[fileList.length-1]
        const {name ,url} = file.response.data;
        file.name=name;
        file.url=url
     }else if(file.status==='removed'){
       const result=await reqDeletImg(file.name)
       if(result.status===0){
           message.success('删除图片成功')
       }else{
           message.error('删除图片失败')
       }
     }
    this.setState({ fileList })
  }
  UNSAFE_componentWillMount(){
     const imgs= this.props.imgs;
     if(imgs && imgs.length>0){
         const fileList = imgs.map((img,index)=>{
             return {
                 uid:-index,
                 name:img,
                 status:'done',
                 url:BASE_IMG+img
             }
         })
         this.setState({fileList})
     }
  }
  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div >
        <Upload
          action="/manage/img/upload"
          name='image'
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length >= 8 ? null : uploadButton}
        </Upload>
        <Modal
          visible={previewVisible}
          footer={null}
          onCancel={this.handleCancel}
        >
          <img alt="example" style={{ width: "100%" }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}


