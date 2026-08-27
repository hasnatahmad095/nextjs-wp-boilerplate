# WordPress Setup Guide

This guide contains WordPress functions that enhance the REST API integration with your Next.js frontend. Add these functions to your WordPress theme's `functions.php` file.

## Table of Contents

1. [ACF Fields with Image URLs and Alt Text](#acf-fields-with-image-urls-and-alt-text)
2. [Featured Image URL Endpoint](#featured-image-url-endpoint)
3. [Auto-Deployment Hook (Optional)](#auto-deployment-hook-optional)

---

## ACF Fields with Image URLs and Alt Text

This function automatically converts ACF image field IDs to include full image URLs and alt text in the REST API response.

```php
function add_image_url_and_alt_to_acf_fields($response, $post, $request) {
    if (function_exists('get_fields')) {
        $acf_fields = get_fields($post->ID);
        if ($acf_fields) {
            foreach ($acf_fields as $key => $value) {
                if (is_numeric($value) && wp_attachment_is_image($value)) {
                    $image_url = wp_get_attachment_url($value);
                    $alt_text = get_post_meta($value, '_wp_attachment_image_alt', true);
                    $acf_fields[$key] = [
                        'id' => $value,
                        'url' => $image_url,
                        'alt' => $alt_text,
                    ];
                }
            }
            $response->data['acf'] = $acf_fields;
        }
    }
    return $response;
}

// Hook into the REST API to modify the response for posts, pages, and other types
function add_acf_fields_to_rest_api() {
    $post_types = ['post', 'page'];
    $custom_post_types = get_post_types(['public' => true, '_builtin' => false]);
    $post_types = array_merge($post_types, $custom_post_types);

    foreach ($post_types as $post_type) {
        add_filter("rest_prepare_{$post_type}", 'add_image_url_and_alt_to_acf_fields', 10, 3);
    }
}
add_action('rest_api_init', 'add_acf_fields_to_rest_api');
```

**Requirements:** Advanced Custom Fields (ACF) plugin must be installed and activated.

---

## Featured Image URL Endpoint

This function adds a `fimg_url` field to the REST API response, providing direct access to featured image URLs.

```php
add_action('rest_api_init', 'register_rest_images');
function register_rest_images(){
    // Add your custom post types to this array
    register_rest_field( array('post', 'page', 'project', 'region'),
        'fimg_url',
        array(
            'get_callback'    => 'get_rest_featured_image',
            'update_callback' => null,
            'schema'          => null,
        )
    );
}

function get_rest_featured_image( $object, $field_name, $request ) {
    if( $object['featured_media'] ){
        // Change 'app-thumb' to your desired image size: 'thumbnail', 'medium', 'large', 'full', or custom size
        $img = wp_get_attachment_image_src( $object['featured_media'], 'full' );
        return $img[0];
    }
    return false;
}
```

**Note:** Update the post types array (`'post', 'page', 'project', 'region'`) to match your custom post types.

---

## Auto-Deployment Hook (Optional)

This function automatically triggers a rebuild of your Next.js site when content is published in WordPress. This is useful for platforms like Vercel, Netlify, or other hosting providers that support webhook deployments.

### For Vercel

```php
add_action( 'wp_insert_post', 'auto_build_request', 10, 2 );
function auto_build_request($post_id, $post) {
    $post_type = get_post_type( $post_id );
    $allowed_post_types = ['post', 'page']; // Add your custom post types here

    if ( $post->post_status == 'publish' && in_array($post_type, $allowed_post_types) ) {
        $data = json_encode(['force_build' => true]);

        // Replace with your Vercel deployment webhook URL
        // Find it in: Vercel Dashboard > Project Settings > Git > Deploy Hooks
        $url = 'YOUR_VERCEL_DEPLOYMENT_WEBHOOK_URL';

        $args = array(
            'body' => $data,
            'headers' => array(
                'Content-Type' => 'application/json'
            ),
            'timeout' => 30,
        );

        $response = wp_remote_post($url, $args);

        if ( is_wp_error( $response ) ) {
            error_log('Auto-deployment failed: ' . $response->get_error_message());
        }
    }
}
```

### For Netlify

```php
add_action( 'wp_insert_post', 'auto_build_request', 10, 2 );
function auto_build_request($post_id, $post) {
    $post_type = get_post_type( $post_id );
    $allowed_post_types = ['post', 'page']; // Add your custom post types here

    if ( $post->post_status == 'publish' && in_array($post_type, $allowed_post_types) ) {
        // Replace with your Netlify build hook URL
        // Find it in: Netlify Dashboard > Site Settings > Build & Deploy > Build Hooks
        $url = 'YOUR_NETLIFY_BUILD_HOOK_URL';

        $args = array(
            'method' => 'POST',
            'timeout' => 30,
        );

        $response = wp_remote_post($url, $args);

        if ( is_wp_error( $response ) ) {
            error_log('Auto-deployment failed: ' . $response->get_error_message());
        }
    }
}
```

**Note:**

- Replace `YOUR_VERCEL_DEPLOYMENT_WEBHOOK_URL` or `YOUR_NETLIFY_BUILD_HOOK_URL` with your actual webhook URL
- Update `$allowed_post_types` array to include your custom post types
- This function is optional and only needed if you want automatic rebuilds on content publish

---

## Installation Instructions

1. **Access your WordPress theme files:**
   - Go to WordPress Admin → Appearance → Theme File Editor
   - Or use FTP/SFTP to access your theme's `functions.php` file

2. **Add the functions:**
   - Copy the functions you need from above
   - Paste them at the end of your `functions.php` file
   - Save the file

3. **Test the integration:**
   - Publish or update a post/page in WordPress
   - Check the REST API endpoint: `https://your-site.com/wp-json/wp/v2/posts/1`
   - Verify that ACF fields and featured images are included in the response

---

## Troubleshooting

- **ACF fields not showing:** Ensure the Advanced Custom Fields plugin is installed and activated
- **Featured images not appearing:** Check that posts/pages have featured images set
- **Auto-deployment not working:** Verify your webhook URL is correct and accessible
- **Custom post types not included:** Make sure your custom post types have `'show_in_rest' => true` in their registration

---

## Additional Resources

- [WordPress REST API Handbook](https://developer.wordpress.org/rest-api/)
- [ACF REST API Integration](https://www.advancedcustomfields.com/resources/wp-rest-api-integration/)
- [Vercel Deploy Hooks](https://vercel.com/docs/concepts/git/deploy-hooks)
- [Netlify Build Hooks](https://docs.netlify.com/configure-builds/build-hooks/)
