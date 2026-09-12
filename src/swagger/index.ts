// Loaded by @nocobase/plugin-api-doc from the package swagger module.
const spec = {
  openapi: '3.0.3',
  info: {
    title: 'Workflow URL Trigger API',
    version: '0.1.0',
    description:
      'عرض أنماط URL workflow وفحص مسار من الواجهة. التنفيذ الخارجي الفعلي يحدث عبر middleware على المسارات التي تطابق إعدادات workflow، وليس عبر endpoint ثابت إضافي.',
  },
  servers: [
    {
      url: '/api',
    },
  ],
  paths: {
    '/urlTrigger:configs': {
      get: {
        operationId: 'listUrlTriggerConfigs',
        summary: 'الأنماط المفعلة الآمنة للنشر',
        security: [],
        responses: {
          '200': {
            description: 'مصفوفة url وmatchMode وsync؛ لا تحتوي على إعدادات حساسة',
          },
        },
      },
    },
    '/urlTrigger:status': {
      get: {
        operationId: 'getUrlTriggerStatus',
        summary: 'حالة تسجيل middleware',
        security: [
          {
            bearerAuth: [],
          },
        ],
        responses: {
          '200': {
            description: '{ middlewareRegistered: boolean }',
          },
          '401': {
            description: 'يلزم تسجيل الدخول',
          },
        },
      },
    },
    '/urlTrigger:check': {
      post: {
        operationId: 'checkUrlTrigger',
        summary: 'تقييم workflows المتزامنة لمسار',
        security: [
          {
            bearerAuth: [],
          },
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  path: {
                    type: 'string',
                  },
                },
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'ناتج workflow أو { action: passthrough } عند غياب path',
          },
          '401': {
            description: 'يلزم تسجيل الدخول',
          },
        },
      },
    },
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
};

export default spec;
