/**
 * Full production-ready WordPress plugin source code
 * Plugin Name: Rahe Konkur Connect & App Download Manager
 */

export const WORDPRESS_PLUGIN_PHP = `<?php
/**
 * Plugin Name: Rahe Konkur Mobile App Connect & Download Manager
 * Plugin URI: https://rahekonkur.ir
 * Description: افزونه اختصاصی اتصال وب‌سایت وردپرس به اپلیکیشن موبایل ره کنکور، مدیریت نسخه‌ها، هماهنگ‌سازی ساعات مطالعه داوطلبان و ویجت دانلود APK.
 * Version: 1.2.0
 * Author: تیم فنی ره کنکور
 * Author URI: https://rahekonkur.ir
 * Text Domain: rahe-konkur
 * Requires at least: 5.8
 * Requires PHP: 7.4
 */

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

class RaheKonkur_Connect {

    private static $instance = null;
    const VERSION = '1.2.0';
    const OPTION_KEY = 'rahe_konkur_settings';

    public static function get_instance() {
        if (self::$instance === null) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    private function __construct() {
        add_action('init', array($this, 'init_plugin'));
        add_action('admin_menu', array($this, 'add_admin_menu'));
        add_action('admin_init', array($this, 'register_settings'));
        add_action('rest_api_init', array($this, 'register_rest_routes'));
        add_shortcode('rahe_konkur_download', array($this, 'render_download_shortcode'));
        add_shortcode('hadaf_plus_download', array($this, 'render_download_shortcode')); // backward compatibility
        add_shortcode('rahe_konkur_stats', array($this, 'render_stats_shortcode'));
    }

    public function init_plugin() {
        // Create custom database table for study logs sync if needed
        $this->maybe_create_tables();
    }

    private function maybe_create_tables() {
        global $wpdb;
        $table_name = $wpdb->prefix . 'hadaf_study_logs';
        $charset_collate = $wpdb->get_charset_collate();

        $sql = "CREATE TABLE IF NOT EXISTS $table_name (
            id bigint(20) NOT NULL AUTO_INCREMENT,
            user_id bigint(20) NOT NULL,
            lesson_title varchar(255) NOT NULL,
            category varchar(100) NOT NULL,
            duration_minutes int(11) NOT NULL DEFAULT 0,
            test_count int(11) NOT NULL DEFAULT 0,
            is_completed tinyint(1) NOT NULL DEFAULT 1,
            study_date date NOT NULL,
            created_at datetime DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY  (id),
            KEY user_id (user_id),
            KEY study_date (study_date)
        ) $charset_collate;";

        require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
        dbDelta($sql);
    }

    /**
     * Admin Menu
     */
    public function add_admin_menu() {
        add_menu_page(
            'هدف پلاس | اپلیکیشن',
            'اپلیکیشن هدف پلاس',
            'manage_options',
            'hadaf-plus-settings',
            array($this, 'render_admin_page'),
            'dashicons-smartphone',
            30
        );
    }

    public function register_settings() {
        register_setting('hadaf_plus_group', self::OPTION_KEY);
    }

    /**
     * Admin Settings Screen
     */
    public function render_admin_page() {
        $options = get_option(self::OPTION_KEY, array(
            'apk_url' => 'https://hadafplus.ir/downloads/hadaf-plus.apk',
            'app_version' => '1.2.0',
            'version_code' => 12,
            'bazaar_url' => 'https://cafebazaar.ir/app/ir.hadafplus.app',
            'myket_url' => 'https://myket.ir/app/ir.hadafplus.app',
            'ios_pwa_url' => 'https://app.hadafplus.ir',
            'api_secret_key' => wp_generate_password(32, false),
            'force_update' => '0',
            'changelog' => "• اضافه شدن سالن مطالعه آنلاین رسمی\\n• بهبود کرنومتر و حالت پومودورو\\n• سیستم رتبه‌بندی هفتگی و روزانه",
            'download_count' => 1450,
        ));
        ?>
        <div class="wrap" dir="rtl" style="font-family: Tahoma, Arial, sans-serif; max-width: 900px;">
            <h1 style="display:flex;align-items:center;gap:10px;">
                <span class="dashicons dashicons-smartphone" style="font-size:32px;width:32px;height:32px;color:#FF7A30;"></span>
                مدیریت اتصال اپلیکیشن موبایل هدف پلاس
            </h1>
            <p>از این بخش می‌توانید لینک‌های دانلود اپلیکیشن، فایل APK مستقیم، کلید امنیتی ارتباط REST API و وضعیت آپدیت‌های برنامه را تنظیم کنید.</p>

            <form method="post" action="options.php" style="background:#fff;padding:20px;border-radius:12px;border:1px solid #ddd;box-shadow:0 2px 4px rgba(0,0,0,0.05);margin-top:20px;">
                <?php settings_fields('hadaf_plus_group'); ?>

                <table class="form-table" role="presentation">
                    <tr>
                        <th scope="row"><label for="apk_url">لینک مستقیم دانلود فایل APK:</label></th>
                        <td>
                            <input name="<?php echo self::OPTION_KEY; ?>[apk_url]" type="url" id="apk_url" value="<?php echo esc_attr($options['apk_url']); ?>" class="regular-text" style="direction:ltr;">
                            <p class="description">آدرس مستقیم فایل اندروید (یا آپلود شده در رسانه‌های وردپرس).</p>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row"><label for="app_version">شماره نسخه فعلی (Version Name):</label></th>
                        <td>
                            <input name="<?php echo self::OPTION_KEY; ?>[app_version]" type="text" id="app_version" value="<?php echo esc_attr($options['app_version']); ?>" class="small-text" style="direction:ltr;">
                            <p class="description">مثال: 1.2.0</p>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row"><label for="version_code">کد نسخه عددی (Version Code):</label></th>
                        <td>
                            <input name="<?php echo self::OPTION_KEY; ?>[version_code]" type="number" id="version_code" value="<?php echo esc_attr($options['version_code']); ?>" class="small-text" style="direction:ltr;">
                        </td>
                    </tr>
                    <tr>
                        <th scope="row"><label for="bazaar_url">لینک کافه‌بازار:</label></th>
                        <td>
                            <input name="<?php echo self::OPTION_KEY; ?>[bazaar_url]" type="url" id="bazaar_url" value="<?php echo esc_attr($options['bazaar_url']); ?>" class="regular-text" style="direction:ltr;">
                        </td>
                    </tr>
                    <tr>
                        <th scope="row"><label for="myket_url">لینک مایکت:</label></th>
                        <td>
                            <input name="<?php echo self::OPTION_KEY; ?>[myket_url]" type="url" id="myket_url" value="<?php echo esc_attr($options['myket_url']); ?>" class="regular-text" style="direction:ltr;">
                        </td>
                    </tr>
                    <tr>
                        <th scope="row"><label for="ios_pwa_url">لینک وب‌اپلیکیشن (PWA / iOS):</label></th>
                        <td>
                            <input name="<?php echo self::OPTION_KEY; ?>[ios_pwa_url]" type="url" id="ios_pwa_url" value="<?php echo esc_attr($options['ios_pwa_url']); ?>" class="regular-text" style="direction:ltr;">
                        </td>
                    </tr>
                    <tr>
                        <th scope="row"><label for="api_secret_key">کلید امنیتی اتصال API (Token):</label></th>
                        <td>
                            <input name="<?php echo self::OPTION_KEY; ?>[api_secret_key]" type="text" id="api_secret_key" value="<?php echo esc_attr($options['api_secret_key']); ?>" class="large-text" style="direction:ltr;">
                            <p class="description">این کلید را در فایل تنظیمات Flutter اپلیکیشن (Core Constants) قرار دهید.</p>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">تغییرات این نسخه (Changelog):</th>
                        <td>
                            <textarea name="<?php echo self::OPTION_KEY; ?>[changelog]" rows="4" class="large-text"><?php echo esc_textarea($options['changelog']); ?></textarea>
                        </td>
                    </tr>
                </table>

                <?php submit_button('ذخیره تغییرات افزونه'); ?>
            </form>

            <div style="background:#f8fafc;padding:20px;border-radius:12px;border:1px solid #e2e8f0;margin-top:20px;">
                <h3 style="margin-top:0;">شورت‌کد نمایش جعبه دانلود در برگه یا نوشته‌ها</h3>
                <p>کافیست شورت‌کد زیر را در هر صفحه‌ای از سایت وردپرسی خود قرار دهید:</p>
                <code style="background:#fff;padding:8px 12px;border:1px solid #ccc;border-radius:6px;font-size:14px;direction:ltr;display:inline-block;">[hadaf_plus_download]</code>
            </div>
        </div>
        <?php
    }

    /**
     * REST API Routes for Mobile Flutter App
     */
    public function register_rest_routes() {
        register_rest_route('hadaf-plus/v1', '/check-update', array(
            'methods' => 'GET',
            'callback' => array($this, 'api_check_update'),
            'permission_callback' => '__return_true',
        ));

        register_rest_route('hadaf-plus/v1', '/app-info', array(
            'methods' => 'GET',
            'callback' => array($this, 'api_get_app_info'),
            'permission_callback' => '__return_true',
        ));

        register_rest_route('hadaf-plus/v1', '/download-apk', array(
            'methods' => 'GET',
            'callback' => array($this, 'api_handle_download_redirect'),
            'permission_callback' => '__return_true',
        ));

        // Sync study log
        register_rest_route('hadaf-plus/v1', '/sync-study-log', array(
            'methods' => 'POST',
            'callback' => array($this, 'api_sync_study_log'),
            'permission_callback' => array($this, 'validate_api_key'),
        ));

        // Get student leaderboard from WP
        register_rest_route('hadaf-plus/v1', '/leaderboard', array(
            'methods' => 'GET',
            'callback' => array($this, 'api_get_leaderboard'),
            'permission_callback' => '__return_true',
        ));
    }

    public function validate_api_key($request) {
        $options = get_option(self::OPTION_KEY);
        $expected_key = isset($options['api_secret_key']) ? $options['api_secret_key'] : '';
        $provided_key = $request->get_header('x-hadaf-api-key');

        if (!$provided_key || $provided_key !== $expected_key) {
            return new WP_Error('unauthorized', 'کلید امنیتی معتبر نیست', array('status' => 401));
        }
        return true;
    }

    public function api_check_update($request) {
        $options = get_option(self::OPTION_KEY);
        $current_version_code = (int) $request->get_param('version_code');
        $latest_version_code = (int) (isset($options['version_code']) ? $options['version_code'] : 1);

        $has_update = $latest_version_code > $current_version_code;

        return rest_ensure_response(array(
            'has_update' => $has_update,
            'latest_version' => $options['app_version'] ?? '1.2.0',
            'version_code' => $latest_version_code,
            'apk_download_url' => home_url('/wp-json/hadaf-plus/v1/download-apk'),
            'bazaar_url' => $options['bazaar_url'] ?? '',
            'myket_url' => $options['myket_url'] ?? '',
            'force_update' => !empty($options['force_update']),
            'changelog' => $options['changelog'] ?? '',
        ));
    }

    public function api_get_app_info() {
        $options = get_option(self::OPTION_KEY);
        return rest_ensure_response(array(
            'app_name' => 'هدف پلاس',
            'version' => $options['app_version'] ?? '1.2.0',
            'apk_url' => home_url('/wp-json/hadaf-plus/v1/download-apk'),
            'bazaar_url' => $options['bazaar_url'] ?? '',
            'myket_url' => $options['myket_url'] ?? '',
            'ios_pwa_url' => $options['ios_pwa_url'] ?? '',
            'downloads_count' => (int) ($options['download_count'] ?? 1450),
        ));
    }

    public function api_handle_download_redirect() {
        $options = get_option(self::OPTION_KEY);
        $apk_url = !empty($options['apk_url']) ? $options['apk_url'] : '';

        // Increment download counter
        $options['download_count'] = ((int) ($options['download_count'] ?? 1450)) + 1;
        update_option(self::OPTION_KEY, $options);

        if (!empty($apk_url)) {
            wp_redirect($apk_url);
            exit;
        } else {
            return new WP_Error('not_found', 'فایل APK تنظیم نشده است', array('status' => 404));
        }
    }

    public function api_sync_study_log($request) {
        global $wpdb;
        $table_name = $wpdb->prefix . 'hadaf_study_logs';

        $params = $request->get_json_params();
        $user_id = (int) ($params['user_id'] ?? get_current_user_id());
        $lesson_title = sanitize_text_field($params['lesson_title'] ?? '');
        $category = sanitize_text_field($params['category'] ?? '');
        $duration_minutes = (int) ($params['duration_minutes'] ?? 0);
        $test_count = (int) ($params['test_count'] ?? 0);
        $study_date = sanitize_text_field($params['study_date'] ?? current_time('Y-m-d'));

        if (empty($lesson_title)) {
            return new WP_Error('invalid_data', 'عنوان درس الزامی است', array('status' => 400));
        }

        $wpdb->insert($table_name, array(
            'user_id' => $user_id,
            'lesson_title' => $lesson_title,
            'category' => $category,
            'duration_minutes' => $duration_minutes,
            'test_count' => $test_count,
            'is_completed' => 1,
            'study_date' => $study_date,
        ));

        return rest_ensure_response(array(
            'success' => true,
            'message' => 'گزارش مطالعه با موفقیت در وردپرس همگام شد',
            'log_id' => $wpdb->insert_id,
        ));
    }

    public function api_get_leaderboard() {
        global $wpdb;
        $table_name = $wpdb->prefix . 'hadaf_study_logs';

        $results = $wpdb->get_results("
            SELECT user_id, 
                   SUM(duration_minutes) as total_minutes, 
                   SUM(test_count) as total_tests 
            FROM $table_name 
            WHERE study_date = CURDATE() 
            GROUP BY user_id 
            ORDER BY total_minutes DESC 
            LIMIT 10
        ", ARRAY_A);

        return rest_ensure_response(array(
            'date' => current_time('Y-m-d'),
            'leaderboard' => $results ?: array(),
        ));
    }

    /**
     * Frontend Shortcode: [hadaf_plus_download]
     */
    public function render_download_shortcode($atts) {
        $options = get_option(self::OPTION_KEY);
        $download_url = home_url('/wp-json/rahe-konkur/v1/download-apk');
        $version = esc_html($options['app_version'] ?? '1.2.0');
        $bazaar = esc_url($options['bazaar_url'] ?? '#');
        $myket = esc_url($options['myket_url'] ?? '#');
        $pwa = esc_url($options['ios_pwa_url'] ?? '#');

        ob_start();
        ?>
        <div class="rahe-konkur-download-card" dir="rtl" style="background:#fff;border-radius:24px;border:1px solid #e2ece9;box-shadow:0 12px 28px -6px rgba(232,59,103,0.08);padding:26px;max-width:540px;margin:24px auto;font-family:Vazirmatn, Tahoma, sans-serif;text-align:right;">
            <div style="display:flex;align-items:center;gap:16px;margin-bottom:16px;">
                <div style="width:62px;height:62px;border-radius:18px;background:#EFF3F1;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 12px rgba(232,59,103,0.15);border:1px solid #dce5e2;">
                    <!-- Mini 4x4 matrix icon -->
                    <div style="display:grid;grid-template-columns:repeat(4, 9px);gap:4px;">
                        <span style="width:9px;height:9px;border-radius:50%;background:#E83B67;box-shadow:0 0 0 2px #F69EB5;"></span>
                        <span style="width:9px;height:9px;border-radius:50%;border:1.5px solid #A0AAB0;"></span>
                        <span style="width:9px;height:9px;border-radius:50%;border:1.5px solid #A0AAB0;"></span>
                        <span style="width:9px;height:9px;border-radius:50%;border:1.5px solid #A0AAB0;"></span>
                        <span style="width:9px;height:9px;border-radius:50%;border:1.5px solid #A0AAB0;"></span>
                        <span style="width:9px;height:9px;border-radius:50%;background:#E83B67;"></span>
                        <span style="width:9px;height:9px;border-radius:50%;border:1.5px solid #A0AAB0;"></span>
                        <span style="width:9px;height:9px;border-radius:50%;border:1.5px solid #A0AAB0;"></span>
                        <span style="width:9px;height:9px;border-radius:50%;border:1.5px solid #A0AAB0;"></span>
                        <span style="width:9px;height:9px;border-radius:50%;border:1.5px solid #A0AAB0;"></span>
                        <span style="width:9px;height:9px;border-radius:50%;background:#E83B67;"></span>
                        <span style="width:9px;height:9px;border-radius:50%;border:1.5px solid #A0AAB0;"></span>
                        <span style="width:9px;height:9px;border-radius:50%;border:1.5px solid #A0AAB0;"></span>
                        <span style="width:9px;height:9px;border-radius:50%;border:1.5px solid #A0AAB0;"></span>
                        <span style="width:9px;height:9px;border-radius:50%;border:1.5px solid #A0AAB0;"></span>
                        <span style="width:9px;height:9px;border-radius:50%;background:#E83B67;"></span>
                    </div>
                </div>
                <div>
                    <h3 style="margin:0;font-size:18px;font-bold;color:#0f172a;">دانلود اپلیکیشن ره کنکور</h3>
                    <p style="margin:4px 0 0;font-size:12px;color:#64748b;">نسخه رسمی <?php echo $version; ?> | مسیر هوشمند موفقیت در کنکور</p>
                </div>
            </div>

            <p style="font-size:13px;color:#475569;line-height:1.7;margin-bottom:20px;">
                سالن مطالعه رقابتی، ماتریس پیگیری تسلط بر دروس، کرنومتر هوشمند بدون حواس‌پرتی و زمان‌بندی روزانه کنکور.
            </p>

            <div style="display:flex;flex-direction:column;gap:10px;">
                <a href="<?php echo esc_url($download_url); ?>" style="display:flex;align-items:center;justify-content:center;gap:8px;background:#E83B67;color:#fff;text-decoration:none;padding:14px;border-radius:16px;font-weight:bold;font-size:14px;box-shadow:0 4px 14px rgba(232,59,103,0.3);text-align:center;">
                    <span>دانلود مستقیم فایل اپلیکیشن ره کنکور (APK)</span>
                </a>

                <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:4px;">
                    <a href="<?php echo $bazaar; ?>" target="_blank" style="display:flex;align-items:center;justify-content:center;gap:6px;background:#EFF3F1;border:1px solid #dce5e2;color:#334155;text-decoration:none;padding:10px;border-radius:14px;font-size:12px;font-weight:bold;">
                        <span>نصب از کافه‌بازار</span>
                    </a>
                    <a href="<?php echo $myket; ?>" target="_blank" style="display:flex;align-items:center;justify-content:center;gap:6px;background:#EFF3F1;border:1px solid #dce5e2;color:#334155;text-decoration:none;padding:10px;border-radius:14px;font-size:12px;font-weight:bold;">
                        <span>نصب از مایکت</span>
                    </a>
                </div>

                <a href="<?php echo $pwa; ?>" target="_blank" style="display:block;text-align:center;color:#E83B67;font-size:12px;font-weight:bold;margin-top:8px;text-decoration:none;">
                    ورود به نسخه وب و iOS بدون نیاز به نصب ←
                </a>
            </div>
        </div>
        <?php
        return ob_get_clean();
    }

    public function render_stats_shortcode() {
        $options = get_option(self::OPTION_KEY);
        $count = number_format_i18n((int) ($options['download_count'] ?? 1450));
        return '<span class="rahe-konkur-download-count" style="font-weight:bold;color:#E83B67;">' . esc_html($count) . ' دریافت</span>';
    }
}

// Instantiate
RaheKonkur_Connect::get_instance();
`;

export const FLUTTER_REST_SERVICE_CODE = `// lib/core/network/wordpress_api_service.dart
import 'package:dio/dio.dart';

class WordPressSyncService {
  final Dio _dio;
  final String baseUrl; // e.g. "https://yoursite.com/wp-json/hadaf-plus/v1"
  final String apiKey;

  WordPressSyncService({
    required this.baseUrl,
    required this.apiKey,
  }) : _dio = Dio(BaseOptions(
          baseUrl: baseUrl,
          headers: {
            'Content-Type': 'application/json',
            'x-hadaf-api-key': apiKey,
          },
          connectTimeout: const Duration(seconds: 10),
          receiveTimeout: const Duration(seconds: 10),
        ));

  /// بررسی وجود آپدیت جدید اپلیکیشن از طریق وردپرس
  Future<Map<String, dynamic>?> checkForUpdate(int currentVersionCode) async {
    try {
      final response = await _dio.get('/check-update', queryParameters: {
        'version_code': currentVersionCode,
      });
      return response.data;
    } catch (e) {
      return null;
    }
  }

  /// همگام‌سازی لاگ مطالعه امروز داوطلب در دیتابیس وردپرس
  Future<bool> syncDailyStudyLog({
    required int userId,
    required String lessonTitle,
    required String category,
    required int durationMinutes,
    required int testCount,
    required String studyDate,
  }) async {
    try {
      final response = await _dio.post('/sync-study-log', data: {
        'user_id': userId,
        'lesson_title': lessonTitle,
        'category': category,
        'duration_minutes': durationMinutes,
        'test_count': testCount,
        'study_date': studyDate,
      });
      return response.statusCode == 200;
    } catch (e) {
      return false;
    }
  }

  /// دریافت رتبه‌بندی کاربران از سرور وردپرس
  Future<List<dynamic>> getLeaderboard() async {
    try {
      final response = await _dio.get('/leaderboard');
      return response.data['leaderboard'] ?? [];
    } catch (e) {
      return [];
    }
  }
}
`;
