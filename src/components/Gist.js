import styled from 'styled-components'
import Octicon from 'react-octicon'

import './style.css'
import IconSection from './IconSections'

const Gist = ({ gist }) => {
    // date format handling
    const handleFormat = (data) => {
        const date = new Date(data);
        return date.toLocaleDateString()
    }
    // long string handling
    const handleDescription = (desc) => {
        if (desc) {
            const description = desc.slice(0, 50)
            return desc.length > 50 ? `${description}...` : description
        } return ''

    }
    // handling of files from object
    const renderFiles = (items) => {
        if (items) {
            return (
                <div className='files'>
                    {
                        Object.keys(items).map((item) => {
                            return (
                                <div key={item + new Date()}>
                                    <Octicon name="file"
                                        className='fileIcon'
                                    />
                                    <Files target='blank' href={items[item].raw_url} >
                                        {items[item].filename}
                                    </Files>
                                </div>
                            )
                        })
                    }
                </div>
            )
        }
    }
    return (
        <Gistcontainer >
            <RowSection>
                <Avatar src={gist.owner.avatar_url} />
                <div>
                    <Text>
                        {gist.owner.login}
                    </Text>
                    <DateSection>
                        Created at:  {handleFormat(gist.created_at)}&nbsp;
                        Last update: {handleFormat(gist.updated_at)}
                    </DateSection>
                    <SubSectionTitle>
                        {handleDescription(gist.description)}
                    </SubSectionTitle>
                    {renderFiles(gist.files)}
                </div>
            </RowSection>
            <RowSection >
                <IconSection
                    gist={gist}
                />
            </RowSection>

        </Gistcontainer >
    )
}

const Files = styled.a`
text-decoration:none;
padding:0px 5px 0px 5px;
margin:0px;
`
const SubSectionTitle = styled.h4`
font-size:14px;
font-weight:400;
`
const Text = styled.p`
font-size:12px;
color:#000;
padding:5px 0px 0px 5px;
margin:0px;
`
const DateSection = styled.p`
font-size:10px;
padding-left: 5px;
`
const Avatar = styled.img`
display:flex;
border-radius:50px;
width:50px;
height:50px;
`;
const Gistcontainer = styled.div`
  display: flex;
  padding:10px;
`;
const RowSection = styled.div`
  display: flex;
  flex:0.5;
  border-bottom: 1px solid lightgray;
  align-items: flex-start;
  padding-bottom:10px;
`;
export default Gist
