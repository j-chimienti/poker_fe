import { Notify } from "quasar"

/**
 * Create a notification using the Quasar Notify plugin.
 * @param {Object} opts - Notification options.
 * @param {number} [opts.timeout] - Timeout in seconds before the notification automatically closes (default is 3 seconds).
 * @param {string} [opts.message] - The main message to display in the notification.
 * @param {string} [opts.caption] - A caption or additional information to display in the notification.
 * @param {string} [opts.color] - The color of the notification (e.g., "red", "blue").
 * @param {string} [opts.position] - The position where the notification should appear (e.g., "left", "right").
 * @returns {Object} - The created notification instance.
 *
 * @example
 * // Create a notification with custom options
 * const exampleOpts = {
 *   timeout: 5, // Close after 5 seconds
 *   message: "This is a notification message",
 *   caption: "Additional information",
 *   color: "green", // Display in green color
 *   position: "bottom-right", // Display at the bottom-right corner
 * };
 * const notification = createNotification(exampleOpts);
 */
export function createNotification(opts) {
  return Notify.create(opts)
}
