import cn from 'classnames';
import { Avatar, Form, Input, Radio } from 'antd';

import Chip from '@components/tag/Chip';

const Step1 = () => {
  const onFinish = (values: any) => {
    console.log(values);
  };

  return (
    <div className={cn('step1-wrap')}>
      <Form name="nest-messages" layout="vertical" onFinish={onFinish} size="large">
        <div className={cn('station-form-item ant-form-item')}>
          <strong className={cn('label')}>프로필 정보를 확인하고, 자기소개를 입력해주세요!</strong>
          <div className={cn('profile-info')}>
            <Avatar size={48} className={cn('user-image type3')} />
            <div className={cn('user-name-wrap')}>
              <strong>Ramses Rim</strong>
              <span>0xabcdefghijklmnop1234567890abcd</span>
            </div>
          </div>
        </div>
        <Form.Item
          name={'textarea'}
          label={
            <>
              WONDER DAO의 멤버들에게 가입인사를 남겨보세요! <span>(선택)</span>
            </>
          }
          className={cn('station-form-item')}
        >
          <Input.TextArea showCount maxLength={50} placeholder={'최대 50자까지 입력가능합니다.'} />
        </Form.Item>
        <Form.Item
          name="radioButton"
          label={
            <>
              WONDER DAO에 가입한 목적은 무엇인가요? <span>(선택)</span>
            </>
          }
          className={cn('station-form-item')}
        >
          <Radio.Group className={cn('radio-chip')}>
            <Radio.Button value="투자">
              <Chip size="sm">투자</Chip>
            </Radio.Button>
            <Radio.Button value="운영">
              <Chip size="sm">운영</Chip>
            </Radio.Button>
            <Radio.Button value="재미">
              <Chip size="sm">재미</Chip>
            </Radio.Button>
            <Radio.Button value="친목">
              <Chip size="sm">친목</Chip>
            </Radio.Button>
          </Radio.Group>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Step1;
