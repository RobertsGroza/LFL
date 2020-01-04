import React, {useState} from 'react';
import './Administration.css';
import { Modal, Button, Upload, Icon, message } from 'antd';
import Container from 'components/Container/Container';

const Administration = () => {
    const [showFileUploadModal, setShowFileUploadModal] = useState(false);
    const [fileList, setFileList] = useState([]);
    const [fileProcessingInProgress, setFileProcessingInProgress] = useState(true);

    const toggleModal = () => {
        setShowFileUploadModal(!showFileUploadModal);
    }

    const processFileList = () => {
        setFileProcessingInProgress(true);

        fileList.map(file => {
            const reader = new FileReader();
            reader.readAsText(file.originFileObj);
            reader.onload = async () => {
                console.log('reader result: ', JSON.parse(reader.result));
            }
        })

        setShowFileUploadModal(false);
        setFileProcessingInProgress(false);
        setFileList([]);
    }

    const uploadProps = {
        multiple: true,
        accept: '.json,.xml',
        fileList: fileList,
        headers: {
            authorization: 'authorization-text',
        },
        onChange: info => {
            setFileList(info.fileList);
        },
        onRemove: file => {
            const index = fileList.indexOf(file);
            const newFileList = fileList.slice();
            newFileList.splice(index, 1);
            setFileList(newFileList);
        },
        beforeUpload: file => {
            return false;
        }
    };
    
    return (
        <Container>
            <h1>Administrācija</h1>
            <br/>
            <h3>Spēļu protokolu augšupielāde:</h3>
            <Button type="primary" onClick={() => toggleModal()} icon="upload">
                Augšupielādēt spēļu protokolus
            </Button>


            <Modal
                title="Spēļu protokolu augšupielāde"
                cancelText="Atcelt"
                okText="Veikt augšupielādi"
                okButtonProps={{icon: "upload"}}
                visible={showFileUploadModal}
                onCancel={() => toggleModal()}
                onOk={() => processFileList()}
            >
                <Upload {...uploadProps}>
                    <Button>
                        <Icon type="file-add"/> Pievienot failus
                    </Button>
                </Upload>
            </Modal>
        </Container>
    )
}
export default Administration;
