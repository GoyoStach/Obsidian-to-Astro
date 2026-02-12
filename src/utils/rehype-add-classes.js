import { visit } from 'unist-util-visit'

/**
 * Custom rehype plugin to add classes to HTML elements
 * Replaces the vulnerable rehype-add-classes package
 *
 * @param {Object} classMap - Object mapping element names to class strings
 * @returns {Function} Rehype plugin function
 */
export function rehypeAddClasses(classMap) {
  return tree => {
    visit(tree, 'element', node => {
      const tagName = node.tagName

      if (classMap[tagName]) {
        if (!node.properties) {
          node.properties = {}
        }

        const existingClasses = node.properties.className || []
        const newClasses = classMap[tagName].split(' ').filter(Boolean)

        node.properties.className = [
          ...(Array.isArray(existingClasses)
            ? existingClasses
            : [existingClasses]),
          ...newClasses
        ]
      }
    })
  }
}
