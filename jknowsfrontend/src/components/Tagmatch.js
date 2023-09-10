import { PlusOutlined } from '@ant-design/icons';
import { Input, Space, Tag, Tooltip, theme } from 'antd';
import { useEffect, useRef, useState } from 'react';
const Tagmatch = ({handledata}) => {
    const { token } = theme.useToken();
    const [tags, setTags] = useState(['请输入']);
    const [inputVisible, setInputVisible] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [NewVisible, setNewVisible] = useState(true);
    const [editInputIndex, setEditInputIndex] = useState(-1);
    const [editInputValue, setEditInputValue] = useState('');
    const inputRef = useRef(null);
    const editInputRef = useRef(null);
    useEffect(() => {
        if (inputVisible) {
            inputRef.current?.focus();
        }
    }, [inputVisible]);
    useEffect(() => {
        editInputRef.current?.focus();
    }, [inputValue]);
    const handleClose = (removedTag) => {
        const newTags = tags.filter((tag) => tag !== removedTag);
        console.log('1',newTags);

        console.log(tags.length);
        setTags(newTags);
        handledata(newTags);
    };

    const showInput = () => {
        setInputVisible(true);
        console.log('2',tags)

    };
    const handleInputChange = (e) => {
        setInputValue(e.target.value);


    };
    const handleInputConfirm = () => {
        if (inputValue && tags.indexOf(inputValue) === -1) {
            setTags([...tags, inputValue]);
        }
        console.log(inputValue)
        setInputVisible(false);
        setInputValue('');
        tags.push(inputValue);
        console.log('4',tags)
        handledata(tags);
    };
    const handleEditInputChange = (e) => {

        setEditInputValue(e.target.value);


    };
    const handleEditInputConfirm = () => {
        const newTags = [...tags];
        newTags[editInputIndex] = editInputValue;
        setTags(newTags);
        console.log('3',newTags)

        setEditInputIndex(-1);
        setInputValue('');
    };
    const tagInputStyle = {
        width: 78,
        verticalAlign: 'top',
    };
    const tagPlusStyle = {
        background: token.colorBgContainer,
        borderStyle: 'dashed',
    };
    return (
        <Space size={[0, 8]} wrap>
            <Space size={[0, 8]} wrap>
                {tags.map((tag, index) => {
                    if (editInputIndex === index) {
                        //if(editInputIndex === 4) HideNewtag()

                        return (
                            <Input
                                ref={editInputRef}
                                key={tag}
                                size="small"
                                style={tagInputStyle}
                                value={editInputValue}
                                onChange={handleEditInputChange}
                                onBlur={handleEditInputConfirm}
                                onPressEnter={handleEditInputConfirm}
                            />
                        );
                    }
                    const isLongTag = tag.length > 20;
                    const tagElem = (
                        <Tag
                            key={tag}
                            closable={index !== -1}
                            style={{
                                userSelect: 'none',
                            }}
                            onClose={() => handleClose(tag)}
                        >
              <span
                  onDoubleClick={(e) => {
                      if (index !== -1 ){
                          setEditInputIndex(index);
                          setEditInputValue(tag);
                          e.preventDefault();
                      }
                  }}
              >
                {isLongTag ? `${tag.slice(0, 20)}...` : tag}
              </span>
                        </Tag>
                    );
                    return isLongTag ? (
                        <Tooltip title={tag} key={tag}>
                            {tagElem}
                        </Tooltip>
                    ) : (
                        tagElem
                    );
                })}
            </Space>
            {inputVisible ? (
                <Input
                    ref={inputRef}
                    type="text"
                    size="small"
                    style={tagInputStyle}
                    value={inputValue}
                    onChange={handleInputChange}
                    onBlur={handleInputConfirm}
                    onPressEnter={handleInputConfirm}
                />
            ) : ( (tags.length <= 4) ? (
                <Tag style={tagPlusStyle} onClick={showInput}>
                    <PlusOutlined /> New Tag
                </Tag>
                ):null
            )}
        </Space>
    );
};
export default Tagmatch;

