
import Gist from './Gist';

const GistList = ({ gists }) => gists && gists.map((item) => <Gist key={item.id} gist={item} />)

export default GistList
