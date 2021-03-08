import styled from 'styled-components'
import Octicon from 'react-octicon'

const IconSectionComponent = ({ gist }) => {
    const fileLength = Object.keys(gist.files)

    return (
        <>
            <IconSection href={gist.html_url}>
                <Octicon name="code"
                    className='icons'
                />
                {fileLength.length} Files
            </IconSection>
            <IconSection href={gist.forks_url}>
                <Octicon
                    className='icons'
                    name="git-merge" />
                    Forks
                </IconSection>
            <IconSection>
                <Octicon
                    className='icons'
                    name="comment"
                />
                {gist.comments} Comments
            </IconSection>
            <IconSection>
                <Octicon
                    className='icons'
                    name="star"
                />
                    Stars
                </IconSection>
        </>
    )
}

const IconSection = styled.a`
display: flex;
padding:10px;
align-items: center

`
export default IconSectionComponent;