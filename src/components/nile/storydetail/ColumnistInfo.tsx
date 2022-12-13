import cn from 'classnames';
import Image from 'next/image';

interface Props {
  data: {
    profileImg: string;
    name: string;
    career: string[];
  };
}

const ColumnistInfo: React.FC<Props> = ({ data }) => {
  console.log(data);
  return (
    <div className={cn('columnist-info-wrap')}>
      <div className={cn('profile-img-wrap')}>
        <Image src={data.profileImg} layout="fill" />
      </div>
      <dl className={cn('name-wrap')}>
        <dt>Columnist</dt>
        <dd>{data.name}</dd>
      </dl>
      <ul className={cn('career-wrap')}>
        {data.career.map((el, index) => (
          <li key={el + index}>{el}</li>
        ))}
      </ul>
    </div>
  );
};

export default ColumnistInfo;
