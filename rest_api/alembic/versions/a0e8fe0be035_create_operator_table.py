"""create operator table

Revision ID: a0e8fe0be035
Revises: 674aa058433a
Create Date: 2023-10-06 18:12:25.123837

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'a0e8fe0be035'
down_revision: Union[str, None] = '674aa058433a'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        'operator',
        sa.Column('id', sa.Integer(), primary_key=True),
        sa.Column('brand', sa.String(256), nullable=False),
        sa.Column('is_transfer', sa.Boolean(), nullable=False)
    )
    pass


def downgrade() -> None:
    op.drop_table('operator')
    pass
