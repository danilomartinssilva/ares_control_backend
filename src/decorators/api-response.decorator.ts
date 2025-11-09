import { applyDecorators, HttpStatus, Type } from '@nestjs/common';
import {
  ApiExtraModels,
  ApiOperation,
  ApiQuery,
  ApiQueryOptions,
  ApiResponse,
  getSchemaPath,
} from '@nestjs/swagger';

import { ApiErrorResponseDto, ApiResponseDto } from '../dto/api-response.dto';

interface ApiResponseWrapperOptions {
  status?: HttpStatus;
  description?: string;
  summary?: string;
  query?: ApiQueryOptions | ApiQueryOptions[];
  type?: Type<unknown>;
  isArray?: boolean;
}

export function SuccessResponseDecorator(
  props: ApiResponseWrapperOptions,
): MethodDecorator {
  const {
    status = HttpStatus.OK,
    description = 'Sucesso',
    summary,
    query,
    type,
    isArray = false,
  } = props;

  const decorators = [];

  if (type) {
    decorators.push(ApiExtraModels(ApiResponseDto, type));
  } else {
    decorators.push(ApiExtraModels(ApiResponseDto));
  }

  if (summary) {
    decorators.push(ApiOperation({ summary }));
  }

  if (query) {
    (Array.isArray(query) ? query : [query]).forEach((q) =>
      decorators.push(ApiQuery(q)),
    );
  }

  decorators.push(
    ApiResponse({
      status,
      description,
      content: {
        'application/json': {
          schema: {
            allOf: [
              { $ref: getSchemaPath(ApiResponseDto) },
              {
                properties: {
                  success: { type: 'boolean', example: true },
                  data: isArray
                    ? { type: 'array', items: { $ref: getSchemaPath(type) } }
                    : { $ref: getSchemaPath(type) },
                },
              },
            ],
          },
        },
      },
    }),
  );

  return applyDecorators(...decorators);
}

export function ErrorResponseDecorator(
  status: HttpStatus,
  description = 'Erro',
): MethodDecorator {
  return applyDecorators(
    ApiExtraModels(ApiErrorResponseDto),
    ApiResponse({
      status,
      description,
      content: {
        'application/json': {
          schema: {
            allOf: [
              { $ref: getSchemaPath(ApiErrorResponseDto) },
              {
                properties: {
                  success: { type: 'boolean', example: false },
                  message: {
                    type: 'array',
                    items: { type: 'string' },
                    example: ['O campo x é obrigatório'],
                  },
                  errors: {
                    type: 'array',
                    items: { type: 'string' },
                    example: ['Bad Request'],
                  },
                },
                required: ['success', 'message', 'errors'],
              },
            ],
          },
        },
      },
    }),
  );
}
