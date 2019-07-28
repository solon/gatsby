import React from "react"
import PropTypes from "prop-types"
import styled from "@emotion/styled"
import { Link } from "gatsby"
import Img from "gatsby-image"
import StarIcon from "react-icons/lib/md/star"
import ArrowDownwardIcon from "react-icons/lib/md/arrow-downward"

import { HorizontalScrollerItem } from "../shared/horizontal-scroller"
import { mediaQueries } from "../../gatsby-plugin-theme-ui"

const MAX_DESCRIPTION_LENGTH = 100

const EcosystemFeaturedItemRoot = styled(HorizontalScrollerItem)`
  margin-right: ${props => props.theme.space[6]};

  ${mediaQueries.md} {
    border-bottom: 1px solid ${props => props.theme.colors.ui.border.subtle};
    box-shadow: none;
    margin: 0;
    padding: 0;
    width: auto;
  }
`

export const BlockLink = styled(Link)`
  background: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.radii[2]}px;
  box-shadow: ${props => props.theme.shadows.raised};
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: ${props => props.theme.space[6]};

  ${mediaQueries.md} {
    border-radius: 0;
    box-shadow: none;
    transition: all ${props => props.theme.transition.speed.default}
      ${props => props.theme.transition.curve.default};
  }

  ${mediaQueries.lg} {
    :hover {
      background: ${props => props.theme.colors.ui.hover};
    }
  }
`

const Header = styled(`header`)`
  align-items: flex-start;
  display: flex;
  justify-content: space-between;

  h3 {
    color: ${props => props.theme.colors.purple[80]};
    font-size: ${props => props.theme.fontSizes[2]};
    margin: 0;
  }

  span {
    align-items: center;
    color: ${props => props.theme.colors.lilac};
    display: flex;
    font-size: ${props => props.theme.fontSizes[1]};
    padding-left: ${props => props.theme.space[3]};

    svg {
      fill: ${props => props.theme.colors.lilac};
      height: auto;
      margin-left: ${props => props.theme.space[1]};
      width: ${props => props.theme.space[4]};
    }
  }
`

const Digest = styled(`div`)`
  display: flex;
  flex-grow: 1;
  font-family: ${props => props.theme.fonts.system};
  justify-content: space-between;
  padding: ${props => props.theme.space[3]} 0 0;
`

const Thumbnail = styled(`div`)`
  height: ${props => props.theme.space[11]};
  padding-right: ${props => props.theme.space[4]};
  margin-top: ${props => props.theme.space[1]};

  img {
    border: 1px solid ${props => props.theme.colors.ui.border.subtle};
  }
`

const Description = styled(`p`)`
  color: ${props => props.theme.colors.text.secondary};
  flex-grow: 1;
  font-size: ${props => props.theme.fontSizes[1]};
  margin: 0;
`

const EcosystemFeaturedItem = ({ item, className }) => {
  const {
    slug,
    name,
    description,
    stars,
    humanDownloadsLast30Days,
    thumbnail,
  } = item

  const cutTooLongDescription = str => {
    if (str.length > MAX_DESCRIPTION_LENGTH) {
      return `${str.substring(0, MAX_DESCRIPTION_LENGTH)}...`
    }

    return str
  }

  return (
    <EcosystemFeaturedItemRoot className={className}>
      <BlockLink to={slug}>
        <Header>
          <h3>{name}</h3>
          {humanDownloadsLast30Days && (
            <span>
              {humanDownloadsLast30Days} <ArrowDownwardIcon />
            </span>
          )}
          {stars && (
            <span>
              {stars} <StarIcon />
            </span>
          )}
        </Header>

        <Digest>
          {thumbnail && (
            <Thumbnail>
              <Img fixed={thumbnail} alt="" />
            </Thumbnail>
          )}
          <Description>{cutTooLongDescription(description)}</Description>
        </Digest>
      </BlockLink>
    </EcosystemFeaturedItemRoot>
  )
}

EcosystemFeaturedItem.propTypes = {
  item: PropTypes.object.isRequired,
  className: PropTypes.string,
}

export default EcosystemFeaturedItem
