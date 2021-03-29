/** @jsxImportSource @emotion/react */
import { committee } from 'data/committee.json'
import CommitteeCard from './CommitteeCard'
import { styles } from './styles'

const Committee = () => (
  <div className='mt-3' css={styles()}>
    {committee.map(member => (
      <CommitteeCard item={member} key={member.name} />
    ))}
  </div>
)

export default Committee
