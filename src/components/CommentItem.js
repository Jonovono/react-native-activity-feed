// @flow
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { humanizeTimestamp, smartRender } from '../utils';
import Avatar from './Avatar';
import { buildStylesheet } from '../styles';

import type { Comment, StyleSheetLike, Renderable } from '../types';

type Props = {
  /** The comment that should be displayed */
  comment: Comment,
  /** Something that should be displayed in the Footer of the component, such
   * as a like button */
  Footer?: Renderable,
  /** Styling of the component */
  styles?: StyleSheetLike,
  /** Handle errors in the render method in a custom way, by default this
   * component logs the error in the console **/
  componentDidCatch?: (error: Error, info: {}, props: Props) => mixed,
};

/**
 * Renders a comment
 * @example ./examples/CommentItem.md
 */
export default class CommentItem extends React.Component<Props> {
  componentDidCatch(error: Error, info: {}) {
    if (this.props.componentDidCatch) {
      this.props.componentDidCatch(error, info, this.props);
    } else {
      console.error(error);
      console.error('The following comment caused the previous error');
      console.error(this.props.comment);
    }
  }

  render() {
    const { comment } = this.props;
    const styles = buildStylesheet('commentItem', this.props.styles || {});
    const emoji = comment.data.emoji;
    return (
      <View style={styles.container}>
        {emoji ? (
          <Text style={addedStyles.emojiStyle}>{emoji}</Text>
        ) : (
          <View style={addedStyles.pinkCircleStyle} />
        )}
        <View style={styles.commentText}>
          <Text>
            <Text style={styles.commentAuthor}>{comment.data.name} </Text>
            <Text style={styles.commentContent}>{comment.data.text} </Text>
            <Text style={styles.commentTime}>
              {humanizeTimestamp(comment.created_at)}
            </Text>
          </Text>
        </View>
        {smartRender(this.props.Footer)}
      </View>
    );
  }
}

const addedStyles = StyleSheet.create({
  emojiStyle: {
    fontSize: 15,
    marginRight: 5,
  },
  pinkCircleStyle: {
    width: 15,
    height: 15,
    borderRadius: 7.5,
    backgroundColor: '#FC32E4',
    marginRight: 5,
  },
});
